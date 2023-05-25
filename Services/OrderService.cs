using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(
        IOrderRepository orderRepository,
        IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public Task<List<Order>> GetAll()
    {
        return _orderRepository.GetAll();
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
        await _orderRepository.SaveChanges();
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

        var deleteResult = await _orderRepository.Delete(id);
        if (deleteResult.IsFailed)
        {
            return Result.Fail(deleteResult.Reasons.Select(x => x.Message));
        }
        var newOne = await _orderRepository.Add(order.Value);
        await _orderRepository.SaveChanges();
        return Result.Ok(newOne);
    }

    public async Task<Result<Guid>> Delete(Guid id)
    {
        var result = await _orderRepository.Delete(id);
        if (result.IsFailed)
        {
            return result;
        }
        await _orderRepository.SaveChanges();
        return result;
    }

    private async Task<Result<Order>> MakeOrder(OrderDto newEntity, Guid? orderId = null)
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