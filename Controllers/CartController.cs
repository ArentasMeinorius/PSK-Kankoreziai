using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Models;
using Kankoreziai.Services.Authentication;
using Kankoreziai.Services.Carts;
using Kankoreziai.Services.Users;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Kankoreziai.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CartController : Controller
    {
        private readonly ICartService _cartService;
        private readonly IUserService _userService;
        private readonly IAuthenticationService _authenticationService;
        public CartController(ICartService cartService, IUserService userService, IAuthenticationService authenticationService)
        {
            _cartService = cartService;
            _userService = userService;
            _authenticationService = authenticationService;
        }

        [HttpPut]
        [ActionName("")]
        [RequiresAuthentication]
        public async Task<IActionResult> Update(CartDto cartDto)
        {
            var user = _authenticationService.User;
            if(user == null)
            {
                return Unauthorized();
            }

            var cartResult = await _cartService.Update(user.CartId, cartDto.CartItems);
            if (cartResult.IsFailed)
            {
                return BadRequest(cartResult.Reasons.Select(x => x.Message));
            }
            return Ok(cartResult.Value);
        }

        [HttpGet]
        [ActionName("")]
        [RequiresAuthentication]
        public async Task<ActionResult<Cart>> Get()
        {
            var user = _authenticationService.User;
            Log.Warning($"User {user}");
            if (user == null)
            {
                return Unauthorized();
            }
            var cartResult = await _cartService.Get(user.CartId);
            if (cartResult.IsFailed)
            {
                return BadRequest(cartResult.Reasons.Select(x => x.Message));
            }
            return Ok(cartResult.Value);
        }

    }
}
