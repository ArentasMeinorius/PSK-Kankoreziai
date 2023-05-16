using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Database;
using Kankoreziai.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Kankoreziai.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly KankoreziaiDbContext _context;
        private readonly IUserService _userService;
        public UserController(KankoreziaiDbContext kankoreziaiDbContext, IUserService userService)
        {
            _context = kankoreziaiDbContext;
            _userService = userService;
        }

        [HttpGet]
        [ActionName("haspermission")]
        [GoogleAuthentication]
        public async Task<ActionResult<bool>> HasPermission([FromQuery] string permission)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            if(userEmail == null)
            {
                return BadRequest();
            }
            return await _userService.HasPermission(userEmail, permission);
        }
    }
}
