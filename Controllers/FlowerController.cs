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
    public IEnumerable<Flower> Get()
    {
        return _context.Flowers.ToList();
    }

    [HttpPost]
    public void Post(Flower myEntity)
    {
        _context.Flowers.Add(myEntity);
        _context.SaveChanges();
    }
}

