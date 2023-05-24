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

    public IList<Order> GetAll()
    {
        var result = _orderRepository.GetAll();
        return result;
    }

    public Task<Result<Order>> Get(Guid id)
    {
        return _orderRepository.Get(id);
    }

    public async Task<Result<Order>> Add(OrderDto entity)
    {
        var result = await MakeOrder(entity);
        if (result.IsFailed)
        {
            return Result.Fail(result.Reasons.Select(x => x.Message));
        }

        var createdEntity = await _orderRepository.Add(result.Value);
        return Result.Ok(createdEntity);
    }

    public async Task<Result<Order>> Update(Guid id, OrderDto newEntity)
    {
        var oldOrder = await Get(id);
        if (oldOrder.IsFailed)
        {
            return Result.Fail(oldOrder.Reasons.Select(x => x.Message));
        }

        var order = await MakeOrder(newEntity, oldOrder.Value.Id);
        if (order.IsFailed)
        {
            return Result.Fail(order.Reasons.Select(x => x.Message));
        }

        var _ = await _orderRepository.Delete(id);
        var newOne = await _orderRepository.Add(order.Value);
        return Result.Ok(newOne);
    }

    public Task<Result<Guid>> Delete(Guid id)
    {
        return _orderRepository.Delete(id);
    }
}