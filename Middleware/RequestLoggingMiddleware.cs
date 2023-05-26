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

    public async Task InvokeAsync(HttpContext context)
    {
        var requestBody = await ReadBodyAsync(context.Request.Body);
        _logger.LogInformation($"Calling {context.Request.Method} {context.Request.Path} {requestBody}");
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
}