using FluentResults;
using Kankoreziai.Attributes.Authentication;
using Newtonsoft.Json;
using RestSharp;
using System.Text;

namespace Kankoreziai.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    private static string GetIP(HttpContext httpContext)
    {
        return httpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var requiresAuthentication = context.GetEndpoint()?.Metadata.GetMetadata<RequiresAuthenticationAttribute>();
        string? email = null;
        if (requiresAuthentication != null)
        {
            email = await GetEmail(context);
        }
        var requestBody = await ReadBodyAsync(context.Request.Body);
        _logger.LogInformation($"User IP: {GetIP(context)}{ (email != null ? ", email: " + email : "") } called {context.Request.Method} {context.Request.Path} {requestBody}");
        context.Request.Body = CreateStream(requestBody);
        await _next(context);
    }

    private Task<string> ReadBodyAsync(Stream body)
    {
        using StreamReader reader = new StreamReader(body, Encoding.UTF8);
        return reader.ReadToEndAsync();
    }

    private Stream CreateStream(string body)
    {
        var requestBodyBytes = Encoding.UTF8.GetBytes(body);
        return new MemoryStream(requestBodyBytes);
    }

    private async Task<string?> GetEmail(HttpContext context)
    {
        var accessToken = context.Request.Headers["Authorization"].ToString();

        if (accessToken == null)
        {
            return null;
        }

        if (!accessToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        accessToken = accessToken.Substring("Bearer ".Length).Trim();
        var emailResult = await GetEmailFromAccessToken(accessToken);
        if (emailResult.IsFailed)
        {
            return null;
        }
        return emailResult.Value;
    }

    private async Task<Result<string>> GetEmailFromAccessToken(string accessToken)
    {
        var client = new RestClient("https://oauth2.googleapis.com");
        var request = new RestRequest($"/tokeninfo?access_token={accessToken}");

        request.RequestFormat = DataFormat.Json;

        string? email = null;

        try
        {
            RestResponse response = await client.ExecuteAsync(request);

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                return Result.Fail("Invalid request");
            }

            if (response.Content == null)
            {
                return Result.Fail("Invalid response content");
            }

            var responseObject = JsonConvert.DeserializeObject<dynamic>(response.Content);

            if (responseObject == null)
            {
                return Result.Fail("Couldn't deserialize response");
            }

            email = responseObject.email;

            if (email == null)
            {
                return Result.Fail("Email is null");
            }
        }
        catch (Exception ex)
        {
            return Result.Fail("Caught exception while sending request");
        }

        return Result.Ok(email);
    }
}