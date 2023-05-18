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
        return Ok(_context.Orders.Include(x => x.InventoryChanges).ThenInclude(y => y.Product).ToList());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var order = await _context.Orders.Include(x => x.InventoryChanges).ThenInclude(y => y.Product).FirstOrDefaultAsync(order => order.Id == id);
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

        _context.Orders.Add(order);
        _context.InventoryChanges.AddRange(order.InventoryChanges);
        await _context.SaveChangesAsync();
        return Ok(order);
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

        var order = await MakeOrder(newEntity, oldOrder.Id);
        if (order == null)
        {
            return StatusCode(404);
        }

        _context.Orders.Remove(oldOrder);
        _context.InventoryChanges.RemoveRange(oldOrder.InventoryChanges);
        _context.Orders.Add(order);
        _context.InventoryChanges.AddRange(order.InventoryChanges);
        await _context.SaveChangesAsync();
        return Ok(order);
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
        _context.InventoryChanges.RemoveRange(oldOrder.InventoryChanges);
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

        var inventoryChanges = newEntity.ItemsInOrder.Select(x =>
            new InventoryChange(Guid.NewGuid(), orderId.Value, products.Single(y => y.Id == x.ProductId), x.Quantity));

        return new Order(
            orderId.Value,
            inventoryChanges.ToList(),
            DateTime.UtcNow,
            DateTime.UtcNow);
    }
}

