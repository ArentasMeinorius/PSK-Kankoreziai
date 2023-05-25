using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public interface IOrderService
{
    Task<List<Order>> GetAll();
    Task<Result<Order>> Get(Guid id);
    Task<Result<Order>> Add(OrderDto entity);
    Task<Result<Order>> Update(Guid id, OrderDto newEntity);
    Task<Result<Guid>> Delete(Guid id);
}