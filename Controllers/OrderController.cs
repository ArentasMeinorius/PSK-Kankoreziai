using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly KankoreziaiDbContext _context;

    public OrderController(KankoreziaiDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public IActionResult GetAll()
    {
        return Ok(_context.Orders.Include(x => x.InventoryChanges).ToList());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return StatusCode(404);
        }
        return Ok(order);
    }
    /*
    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(OrderDto newEntity)
    {
        var newOrder = new Order(Guid.NewGuid(), newEntity.Flowers, newEntity.UpdatedAt, newEntity.CreatedAt);
        _context.Orders.Add(newOrder);
        await _context.SaveChangesAsync();
        return Ok(newOrder);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, OrderDto newEntity)
    {
        var oldOrder = await _context.Orders.FindAsync(id);
        if (oldOrder == null)
        {
            return StatusCode(404);
        }
        var changedOrder = oldOrder with
        {
            Flowers = newEntity.Flowers,
            UpdatedAt = newEntity.UpdatedAt,
            CreatedAt = newEntity.CreatedAt
        };
        _context.Orders.Remove(oldOrder);
        _context.Orders.Add(changedOrder);
        await _context.SaveChangesAsync();
        return Ok(changedOrder);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var oldOrder = await _context.Orders.FindAsync(id);
        if (oldOrder == null)
        {
            return Ok(id);
        }
        _context.Orders.Remove(oldOrder);
        await _context.SaveChangesAsync();
        return Ok(id);
    }
    */
}

