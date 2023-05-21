﻿namespace Kankoreziai.Models;

public record Order
{
    public Guid Id { get; init; }
    public List<OrderProduct> OrderProducts { get; init; } = new();
    public OrderStatus OrderStatus { get; init; }
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }

    public Order()
    {
    }

    public Order(Guid id, List<OrderProduct> orderProducts, OrderStatus orderStatus, DateTime updatedAt, DateTime createdAt)
    {
        Id = id;
        OrderProducts = orderProducts;
        OrderStatus = orderStatus;
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
    }
}