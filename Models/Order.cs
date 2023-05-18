namespace Kankoreziai.Models;

public record Order
{
    public Guid Id { get; init; }
    public List<InventoryChange> InventoryChanges { get; init; } = new();
    public OrderStatus OrderStatus { get; init; }
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }

    public Order()
    {
    }

    public Order(Guid id, List<InventoryChange> inventoryChanges, OrderStatus orderStatus, DateTime updatedAt, DateTime createdAt)
    {
        Id = id;
        InventoryChanges = inventoryChanges;
        OrderStatus = orderStatus;
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
    }
}