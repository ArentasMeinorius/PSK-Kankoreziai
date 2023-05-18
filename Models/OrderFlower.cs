
namespace Kankoreziai.Models;

public record OrderProduct
{
    public OrderProduct(Guid id, Order order, Product product)
    {
        Id = id;
        Order = order;
        Product = product;
    }

    public OrderProduct()
    {
    }

    public Guid Id { get; init; }
    public Order Order { get; init; }
    public Product Product { get; init; }
}

