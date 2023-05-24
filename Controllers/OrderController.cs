using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Models;
using Kankoreziai.Services;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _service;

    public OrderController(IOrderService orderService)
    {
        _service = orderService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var result = await _service.Get(id); 
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(OrderDto newEntity)
    {
        var result = await _service.Add(newEntity);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, OrderDto newEntity)
    {
        var result = await _service.Update(id, newEntity);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.Delete(id);
        if (result.IsFailed)
        {
            return StatusCode(400, result.Reasons);
        }
        return Ok(result);
    }
}

