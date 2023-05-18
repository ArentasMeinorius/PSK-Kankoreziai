namespace Kankoreziai.Models;

public class InventoryChange
{
    public Guid Id { get; init; }
    public Guid OrderId { get; init; }
    public Product Product { get; init; }
    public Quantity Quantity { get; init; }

    public InventoryChange()
    {
    }

    public InventoryChange(Guid id, Guid orderId, Product product, Quantity quantity)
    {
        Id = id;
        OrderId = orderId;
        Product = product;
        Quantity = quantity;
    }
}