using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class OrdersRepository : IOrdersRepository
{
    private readonly KankoreziaiDbContext _context;
    private readonly IProductsRepository _productsRepository;

    public OrdersRepository(KankoreziaiDbContext context, IProductsRepository productsRepository)
    {
        _context = context;
        _productsRepository = productsRepository;
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
        await _productsRepository.Add(order.OrderProducts);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Guid> Delete(Order entity)
    {
        _context.Orders.Remove(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }
}