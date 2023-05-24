using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;
using Kankoreziai.Services;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderRepository _repository;
    private readonly IOrderService _orderService;

    public OrderController(IOrderRepository repository, IOrderService orderService)
    {
        _repository = repository;
        _orderService = orderService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public IActionResult GetAll()
    {
        return Ok(_repository.GetAll());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var order = await _repository.Get(id); 
        if (order == null)
        {
            return StatusCode(400);
        }
        return Ok(order);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(OrderDto newEntity)
    {
        var result = await _orderService.MakeOrder(newEntity);
        if (result.IsFailed)
        {
            return new ObjectResult(result.Errors);
        }

        var createdResult = await _repository.Add(result.Value);
        return Ok(createdResult);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, OrderDto newEntity)
    {
        var oldOrder = await _repository.Get(id);
        if (oldOrder == null)
        {
            return StatusCode(404);
        }

        var order = await _orderService.MakeOrder(newEntity, oldOrder.Id);
        if (order.IsFailed)
        {
            return new ObjectResult(order.Errors);
        }

        await _repository.Delete(oldOrder);
        var result = await _repository.Add(order.Value);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var oldOrder = await _repository.Get(id);
        if (oldOrder == null)
        {
            return Ok(id);
        }
        var result = await _repository.Delete(oldOrder);
        return Ok(result);
    }
}

