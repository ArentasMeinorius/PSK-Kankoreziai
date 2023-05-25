using FluentResults;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class ProductRepository : IProductRepository
{
    private readonly KankoreziaiDbContext _context;

    public ProductRepository(KankoreziaiDbContext context)
    {
        _context = context;
    }

    public Task<List<Product>> GetAll()
    {
        return _context.Products.ToListAsync();
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
        return id;
    }

    public Task SaveChanges()
    {
        return _context.SaveChangesAsync();
    }

    public async Task<Result<Product>> UpdateFirstException()
    {
        var productA = _context.Products.First();
        var productB = _context.Products.First();
        var product1 = productA with
        {
            Name = productA.Name + "1"
        };
        var product2 = productB with
        {
            Name = productA.Name + "2"
        };

        _context.Products.Update(product1);
        await _context.SaveChangesAsync();
        
        try
        {
            _context.Products.Update(product1);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)//DbUpdateConcurrencyException)
        {
            return Result.Fail("Optimistic Lock Exception");
        }

        return Result.Ok(product1);
    }
}