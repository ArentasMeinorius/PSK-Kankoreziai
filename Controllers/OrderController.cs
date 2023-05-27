using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Models;
using Kankoreziai.Services;
using Kankoreziai.Attributes.Authentication;
using Kankoreziai.Services.Authentication;

namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : Controller
{
    private readonly IOrderService _service;
    private readonly IAuthenticationService _authenticationService;

    public OrderController(IOrderService orderService, IAuthenticationService authenticationService)
    {
        _service = orderService;
        _authenticationService = authenticationService;
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [RequiresAuthentication("orders.fetchall")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }


    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    [RequiresAuthentication]
    public async Task<IActionResult> Get(Guid id)
    {
        var result = await _service.Get(id); 
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result.Value);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [RequiresAuthentication]
    public async Task<IActionResult> Post(OrderDto newEntity)
    {
        var user = _authenticationService.User;
        if (user == null)
        {
            return Unauthorized();
        }

        var result = await _service.Add(newEntity, user.Guid);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result.Value);
    }

    [HttpPost("cart")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [RequiresAuthentication]
    public async Task<IActionResult> PostFromUserCart()
    {
        var user = _authenticationService.User;
        if(user == null)
        {
            return Unauthorized();
        }

        var result = await _service.MakeOrderFromCart(user.CartId, user.Guid);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result.Value);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    [RequiresAuthentication("orders.edit")]
    public async Task<IActionResult> Put(Guid id, OrderDto newEntity)
    {
        var result = await _service.Update(id, newEntity);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result.Value);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [RequiresAuthentication("orders.delete")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.Delete(id);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result.Value);
    }
}

