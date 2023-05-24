using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class OrderRepository : IOrderRepository
{
    private readonly KankoreziaiDbContext _context;
    private readonly IProductRepository _productRepository;

    public OrderRepository(KankoreziaiDbContext context, IProductRepository productRepository)
    {
        _context = context;
        _productRepository = productRepository;
    }

    public IList<Order> GetAll()
    {
        return _context.Orders.Include(x => x.OrderProducts).ThenInclude(y => y.Product).ToList();
    }

    public Task<Order?> Get(Guid id)
    {
        return _context.Orders.Include(x => x.OrderProducts).ThenInclude(y => y.Product).FirstOrDefaultAsync(order => order.Id == id);
    }

    public async Task<Order> Add(Order entity)
    {
        await _context.Orders.AddAsync(entity);
        await _context.OrderProducts.AddRangeAsync(entity.OrderProducts);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Guid> Delete(Order entity)
    {
        _context.Orders.Remove(entity);
        _context.OrderProducts.RemoveRange(entity.OrderProducts);
        await _context.SaveChangesAsync();
        return entity.Id;
    }
}