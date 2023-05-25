using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Services.Users;
using Newtonsoft.Json;
using RestSharp;
using Serilog;
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
            var endpoint = context.GetEndpoint();
            var requiresAuthentication = endpoint?.Metadata?.GetMetadata<RequiresAuthenticationAttribute>() != null;

            if(!requiresAuthentication)
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

            var client = new RestClient("https://oauth2.googleapis.com");
            var request = new RestRequest($"/tokeninfo?id_token={accessToken}");

            request.RequestFormat = DataFormat.Json;

            try
            {
                RestResponse response = await client.ExecuteAsync(request); 

                if(response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                if (response.Content == null)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                var responseObject = JsonConvert.DeserializeObject<dynamic>(response.Content);

                if(responseObject == null)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                string email = responseObject.email;

                if (email == null)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                var user = await _userService.GetUserAsync(email);
                if (user == null)
                {
                    _userService.CreateUser(email);
                    return;
                }

                var principal = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Email, email)
                }, "Google"));

                context.User = principal;
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                Log.Error(ex, "Error while validating token");
            }

            await next(context);
        }
    }
}
