using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Database;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Kankoreziai.Services.Users;
using Kankoreziai.Models;
using Serilog;
using Kankoreziai.Services.Authentication;

namespace Kankoreziai.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private IAuthenticationService _authenticationService;

        public UserController(IUserService userService, IAuthenticationService authenticationService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [ActionName("haspermission")]
        [RequiresAuthentication]
        public ActionResult<bool> HasPermission([FromQuery] string permission)
        {
            var user = _authenticationService.User;
            if (user == null)
            {
                return false;
            }
            return _userService.HasPermission(user, permission);
        }
    }
}
