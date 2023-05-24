using FluentResults;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class OrderRepository : IOrderRepository
{
    private readonly KankoreziaiDbContext _context;

    public OrderRepository(KankoreziaiDbContext context)
    {
        _context = context;
    }

    public Task<List<Order>> GetAll()
    {
        return _context.Orders.Include(x => x.OrderProducts).ThenInclude(y => y.Product).ToListAsync();
    }

    public async Task<Result<Order>> Get(Guid id)
    {
        var item = await _context.Orders.Include(x => x.OrderProducts).ThenInclude(y => y.Product)
            .FirstOrDefaultAsync(order => order.Id == id);
        if (item == null)
        {
            return Result.Fail("Did not find order");
        }
        return Result.Ok(item);
    }

    public async Task<Order> Add(Order entity)
    {
        await _context.Orders.AddAsync(entity);
        await _context.OrderProducts.AddRangeAsync(entity.OrderProducts);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Result<Guid>> Delete(Guid id)
    {
        var oldOrder = await Get(id);
        if (oldOrder.IsFailed)
        {
            return Result.Fail(oldOrder.Reasons.Select(x => x.Message));
        }

        _context.Orders.Remove(oldOrder.Value);
        _context.OrderProducts.RemoveRange(oldOrder.Value.OrderProducts);
        await _context.SaveChangesAsync();
        return Result.Ok(id);
    }
}