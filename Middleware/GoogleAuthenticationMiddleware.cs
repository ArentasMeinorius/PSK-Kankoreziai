using FluentResults;
using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Services.Users;
using Newtonsoft.Json;
using RestSharp;
using Serilog;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace Kankoreziai.Middleware
{
    public class GoogleAuthenticationMiddleware : IMiddleware
    {

        private readonly IUserService _userService;
        public GoogleAuthenticationMiddleware(IUserService userService)
        {
            _userService = userService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            Log.Warning("Middleware invoked");
            var requiresAuthentication = context.GetEndpoint()?.Metadata.GetMetadata<RequiresAuthenticationAttribute>();

            if (requiresAuthentication == null)
            {
                await next(context);
                return;
            }

            var accessToken = context.Request.Headers["Authorization"].ToString();

            if (accessToken == null)
            {
                context.Response.StatusCode = 401;
                return;
            }

            if (!accessToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                context.Response.StatusCode = 401;
                return;
            }

            accessToken = accessToken.Substring("Bearer ".Length).Trim();

            var tokenResult = await GetEmailFromAccessToken(accessToken);

            if (tokenResult.IsFailed)
            {
                context.Response.StatusCode = 401;
            }


            var user = await _userService.GetOrCreate(tokenResult.Value);

            if(requiresAuthentication.Permissions != null)
            {
                if (user.Permissions.All(permission => !requiresAuthentication.Permissions.Contains(permission)))
                {
                    context.Response.StatusCode = 403;
                    return;
                }
            }

            context.Items.Add("User", user);

            await next(context);
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
}
