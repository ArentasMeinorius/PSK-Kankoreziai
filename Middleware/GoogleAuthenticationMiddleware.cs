using Kankoreziai.Attributes.Authentication;
using Newtonsoft.Json;
using RestSharp;
using Serilog;
using System.Security.Claims;

namespace Kankoreziai.Middleware
{
    public class GoogleAuthenticationMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            Endpoint? endpoint = context.GetEndpoint();
            bool requiresAuthentication = endpoint?.Metadata?.GetMetadata<GoogleAuthenticationAttribute>() != null;

            if(!requiresAuthentication)
            {
                await next(context);
                return;
            }

            string accessToken = context.Request.Headers["Authorization"];

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

            RestClient client = new RestClient("https://oauth2.googleapis.com");
            RestRequest request = new RestRequest($"/tokeninfo?id_token={accessToken}");
            request.RequestFormat = DataFormat.Json;

            try
            {
                RestResponse response = await client.ExecuteAsync(request);

                Log.Warning(response.Content);

                if(response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                dynamic responseObject = JsonConvert.DeserializeObject<dynamic>(response.Content);
                string email = responseObject.email;
                string name = responseObject.name;

                ClaimsPrincipal principal = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
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
