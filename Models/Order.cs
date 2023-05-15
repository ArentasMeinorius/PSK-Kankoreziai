namespace Kankoreziai.Models;

public record Order//(Guid Id, List<OrderFlower> Flowers, DateTime UpdatedAt, DateTime CreatedAt);
{
    public Order(Guid id, List<OrderFlower> flowers, DateTime updatedAt, DateTime createdAt)
    {
        Id = id;
        Flowers = flowers;
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
    }

    public Order()
    {
    }

    public Guid Id { get; init; }
    public List<OrderFlower> Flowers { get; init; } = new List<OrderFlower>();
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }
}