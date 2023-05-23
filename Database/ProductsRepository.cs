using Kankoreziai.Models;

namespace Kankoreziai.Database;

public class ProductsRepository : IProductsRepository
{
    private readonly KankoreziaiDbContext _context;

    public ProductsRepository(KankoreziaiDbContext context)
    {
        _context = context;
    }

    public IList<Product> GetAll()
    {
        return _context.Products.ToList();
    }

    public ValueTask<Product?> Get(Guid id)
    {
        return _context.Products.FindAsync(id);
    }

    public async Task<Product> Add(Product entity)
    {
        await _context.Products.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public Task Add(IList<Product> entities)
    {
        return _context.Products.AddRangeAsync(entities);
    }

    public async Task<Guid> Delete(Product entity)
    {
        _context.Products.Remove(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }
}