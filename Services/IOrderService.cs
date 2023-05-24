using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public interface IOrderService
{
    Task<Result<Order>> MakeOrder(OrderDto newEntity, Guid? orderId = null);
}