using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database;

public class ProductRepository : IProductRepository
{
    private readonly KankoreziaiDbContext _context;

    public ProductRepository(KankoreziaiDbContext context)
    {
        _context = context;
    }

    public IList<Product> GetAll()
    {
        return _context.Products.ToList();
    }

    public async Task<Result<Product>> Get(Guid id)
    {
        var item = await _context.Products.FindAsync(id);
        if (item == null)
        {
            return Result.Fail("Did not find product");
        }
        return Result.Ok(item);
    }

    public async Task<Product> Add(Product entity)
    {
        await _context.Products.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Result<Guid>> Delete(Guid id)
    {
        var itemResult = await Get(id);
        if (itemResult.IsFailed)
        {
            return Result.Fail(itemResult.Errors);
        }
        _context.Products.Remove(itemResult.Value);
        await _context.SaveChangesAsync();
        return id;
    }
}