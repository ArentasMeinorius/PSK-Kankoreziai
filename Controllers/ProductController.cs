using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Database;
using Kankoreziai.Models;


namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductsRepository _repository;

    public ProductController(IProductsRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public IActionResult GetAll()
    {
        return Ok(_repository.GetAll());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Get(Guid id)
    {
        var product = await _repository.Get(id);
        if (product == null)
        {
            return StatusCode(404);
        }
        return Ok(product);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> Post(ProductDto newEntity)
    {
        var product = new Product(
            Guid.NewGuid(),
            newEntity.Name,
            newEntity.Price,
            newEntity.Description,
            newEntity.Thumbnail,
            newEntity.Pictures,
            newEntity.Quantity,
            newEntity.Category);
        var result = await _repository.Add(product);
        return Ok(result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, ProductDto newEntity)
    {
        var oldProduct = await _repository.Get(id);
        if (oldProduct == null)
        {
            return StatusCode(404);
        }
        var changedProduct = oldProduct with
        {
            Name = newEntity.Name,
            Price = newEntity.Price
        };
        await _repository.Delete(changedProduct);
        var result = _repository.Add(changedProduct);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repository.Get(id);
        if (product == null)
        {
            return StatusCode(404);
        }
        var result = await _repository.Delete(product);
        return Ok(result);
    }
}

