using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrdersRepository _repository;

    public OrderController(IOrdersRepository repository)
    {
        _repository = repository;
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
            return StatusCode(404);
        }
        return Ok(order);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(OrderDto newEntity)
    {
        var order = await MakeOrder(newEntity);
        if (order == null)
        {
            return StatusCode(404);
        }

        _repository.Add(order);
        _context.OrderProducts.AddRange(order.OrderProducts);
        await _context.SaveChangesAsync();
        return Ok(order);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, OrderDto newEntity)
    {
        var oldOrder = await _repository.FindAsync(id);
        if (oldOrder == null)
        {
            return StatusCode(404);
        }

        var order = await MakeOrder(newEntity, oldOrder.Id);
        if (order == null)
        {
            return StatusCode(404);
        }

        _repository.Remove(oldOrder);
        _context.OrderProducts.RemoveRange(oldOrder.OrderProducts);
        _repository.Add(order);
        _context.OrderProducts.AddRange(order.OrderProducts);
        await _context.SaveChangesAsync();
        return Ok(order);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var oldOrder = await _repository.FindAsync(id);
        if (oldOrder == null)
        {
            return Ok(id);
        }
        _repository.Remove(oldOrder);
        _context.OrderProducts.RemoveRange(oldOrder.OrderProducts);
        await _context.SaveChangesAsync();
        return Ok(id);
    }

    private async Task<Order?> MakeOrder(OrderDto newEntity, Guid? orderId = null)
    {
        var productTasks = newEntity.ItemsInOrder.Select(x => _context.Products.FindAsync(x.ProductId).AsTask()).ToList();
        await Task.WhenAll(productTasks);
        if (productTasks.Any(x => x.Result == null))
        {
            return null;
        }
        var products = productTasks.Select(x => x.Result);

        orderId ??= Guid.NewGuid();

        var orderProducts = newEntity.ItemsInOrder.Select(x =>
            new OrderProduct(Guid.NewGuid(), orderId.Value, products.Single(y => y.Id == x.ProductId), x.Quantity));

        return new Order(
            orderId.Value,
            orderProducts.ToList(),
            newEntity.OrderStatus,
            DateTime.UtcNow,
            DateTime.UtcNow);
    }
}

