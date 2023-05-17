using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly KankoreziaiDbContext _context;

    public ProductController(KankoreziaiDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public IActionResult GetAll()
    {
        return Ok(_context.Products.ToList());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var flower = await _context.Products.FindAsync(id);
        if (flower == null)
        {
            return StatusCode(404);
        }
        return Ok(flower);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(ProductDto newEntity)
    {
        var newFlower = new Product(
            Guid.NewGuid(),
            newEntity.Name,
            newEntity.Price,
            newEntity.Description,
            newEntity.Thumbnail,
            newEntity.Pictures,
            newEntity.Quantity);
        _context.Products.Add(newFlower);
        await _context.SaveChangesAsync();
        return Ok(newFlower);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, ProductDto newEntity)
    {
        var oldFlower = await _context.Products.FindAsync(id);
        if (oldFlower == null)
        {
            return StatusCode(404);
        }
        var changedFlower = oldFlower with
        {
            Name = newEntity.Name,
            Price = newEntity.Price
        };
        _context.Products.Remove(oldFlower);
        _context.Products.Add(changedFlower);
        await _context.SaveChangesAsync();
        return Ok(changedFlower);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var oldFlower = await _context.Products.FindAsync(id);
        if (oldFlower == null)
        {
            return Ok(id);
        }
        _context.Products.Remove(oldFlower);
        await _context.SaveChangesAsync();
        return Ok(id);
    }
}

