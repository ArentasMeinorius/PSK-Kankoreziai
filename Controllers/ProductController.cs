using Microsoft.AspNetCore.Mvc;
using Kankoreziai.Models;
using Kankoreziai.Services;
using Kankoreziai.Attributes.Authentication;

namespace Kankoreziai.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
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
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [RequiresAuthentication("products.create")]
    public async Task<IActionResult> Post(ProductDto newEntity)
    {
        var result = await _service.Add(newEntity);
        return Ok(result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
    public async Task<IActionResult> Put(Guid id, ProductDto newEntity)
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
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("application/json")]
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

