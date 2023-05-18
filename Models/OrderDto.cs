namespace Kankoreziai.Models;

public record OrderDto(List<ItemInOrder> ItemsInOrder);

public record ItemInOrder(Guid ProductId, Quantity Quantity);