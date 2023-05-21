namespace Kankoreziai.Models;

public record OrderDto(List<ItemInOrder> ItemsInOrder, OrderStatus OrderStatus);

public record ItemInOrder(Guid ProductId, Quantity Quantity);