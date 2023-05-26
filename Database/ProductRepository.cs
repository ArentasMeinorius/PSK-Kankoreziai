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

    public async Task<Result<Guid>> DeleteFirstException()
    {
        var product1 = _context.Products.First();
        var product2 = _context.Products.First();

        _context.Products.Remove(product1);
        await _context.SaveChangesAsync();
        _context.Products.Remove(product2);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException exception)
        {
            return Result.Fail("Optimistic Lock Exception. " + exception.Message);
        }

        return Result.Ok(product2.Id);
    }
}