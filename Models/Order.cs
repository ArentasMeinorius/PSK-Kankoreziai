namespace Kankoreziai.Models;

public record Order
{
    public Guid Id { get; init; }
    public List<InventoryChange> InventoryChanges { get; init; } = new();
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }

    public Order(Guid id, List<InventoryChange> inventoryChanges, DateTime updatedAt, DateTime createdAt)
    {
        Id = id;
        InventoryChanges = inventoryChanges;
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
    }

    public Order()
    {
    }
}

//public record InventoryChange(Guid OrderId, Guid ProductId, Quantity Quantity);

public class InventoryChange
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Product ProductId { get; set; }
    public Quantity Quantity { get; set; }

    public InventoryChange()
    {
    }

    public InventoryChange(Guid id, Guid orderId, Product productId, Quantity quantity)
    {
        Id = Id;
        OrderId = orderId;
        ProductId = productId;
        Quantity = quantity;
    }
}
