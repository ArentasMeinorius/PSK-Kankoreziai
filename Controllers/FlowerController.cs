using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class FlowerController : ControllerBase
{
    private readonly KankoreziaiDbContext _context;

    public FlowerController(KankoreziaiDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Flower>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public IActionResult GetAll()
    {
        return Ok(_context.Flowers.ToList());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Flower), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var flower = await _context.Flowers.FindAsync(id);
        if (flower == null)
        {
            return StatusCode(404);
        }
        return Ok(flower);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Flower), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(FlowerDto newEntity)
    {
        var newFlower = new Flower(Guid.NewGuid(), newEntity.Name, newEntity.Price);
        _context.Flowers.Add(newFlower);
        await _context.SaveChangesAsync();
        return Ok(newFlower);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Flower), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, FlowerDto newEntity)
    {
        var oldFlower = await _context.Flowers.FindAsync(id);
        if (oldFlower == null)
        {
            return StatusCode(404);
        }
        var changedFlower = oldFlower with
        {
            Name = newEntity.Name,
            Price = newEntity.Price
        };
        _context.Flowers.Remove(oldFlower);
        _context.Flowers.Add(changedFlower);
        await _context.SaveChangesAsync();
        return Ok(changedFlower);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var oldFlower = await _context.Flowers.FindAsync(id);
        if (oldFlower == null)
        {
            return Ok(id);
        }
        _context.Flowers.Remove(oldFlower);
        await _context.SaveChangesAsync();
        return Ok(id);
    }
}

