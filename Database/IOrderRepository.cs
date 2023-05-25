using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IOrderRepository
{
    Task<List<Order>> GetAll();
    Task<Result<Order>> Get(Guid id);
    Task<Order> Add(Order entity);
    Task<Result<Guid>> Delete(Guid id);
    Task SaveChanges();
}