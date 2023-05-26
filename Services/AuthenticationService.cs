using Kankoreziai.Models;

namespace Kankoreziai.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public AuthenticationService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public User? User
        {
            get
            {
                if (_contextAccessor.HttpContext.Items.ContainsKey("User"))
                {
                    return _contextAccessor.HttpContext.Items["User"] as User;
                }
                return null;
            }
        }
    }
}
