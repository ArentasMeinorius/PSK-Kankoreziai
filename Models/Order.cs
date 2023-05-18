namespace Kankoreziai.Models;

public record Order
{
    public Order(Guid id, List<OrderProduct> products, DateTime updatedAt, DateTime createdAt)
    {
        Id = id;
        Products = products;
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
    }

    public Order()
    {
    }

    public Guid Id { get; init; }
    public List<OrderProduct> Products { get; init; } = new List<OrderProduct>();
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }
}