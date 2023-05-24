using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public async Task<Result<Order>> MakeOrder(OrderDto newEntity, Guid? orderId = null)
    {
        var productTasks = newEntity.ItemsInOrder.Select(x => _productRepository.Get(x.ProductId)).ToList();
        await Task.WhenAll(productTasks);
        if (productTasks.Any(x => x.Result.IsFailed))
        {
            return Result.Fail(productTasks.Where(y => y.IsFaulted).SelectMany(z => z.Result.Errors));
        }
        var products = productTasks.Select(x => x.Result);

        orderId ??= Guid.NewGuid();

        var orderProducts = newEntity.ItemsInOrder.Select(x =>
            new OrderProduct(Guid.NewGuid(), orderId.Value, products.Single(y => y.Value.Id == x.ProductId).Value, x.Quantity));

        return new Order(
            orderId.Value,
            orderProducts.ToList(),
            newEntity.OrderStatus,
            DateTime.UtcNow,
            DateTime.UtcNow);
    }
}