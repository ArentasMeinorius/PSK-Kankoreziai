using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Database;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Kankoreziai.Services.Users;
using Kankoreziai.Models;
using Kankoreziai.Services;
using Serilog;

namespace Kankoreziai.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly KankoreziaiDbContext _context;
        private readonly IUserService _userService;
        private IAuthenticationService _authenticationService;

        public UserController(KankoreziaiDbContext kankoreziaiDbContext, IUserService userService, IAuthenticationService authenticationService)
        {
            _context = kankoreziaiDbContext;
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
