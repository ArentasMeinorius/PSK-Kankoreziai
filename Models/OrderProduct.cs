namespace Kankoreziai.Models;

public class OrderProduct
{
    public Guid Id { get; init; }
    public Guid OrderId { get; init; }
    public Product Product { get; init; }
    public Quantity Quantity { get; init; }

    public OrderProduct()
    {
    }

    public OrderProduct(Guid id, Guid orderId, Product product, Quantity quantity)
    {
        Id = id;
        OrderId = orderId;
        Product = product;
        Quantity = quantity;
    }
}