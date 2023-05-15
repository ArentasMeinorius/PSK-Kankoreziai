using Microsoft.AspNetCore.Http.HttpResults;

namespace Kankoreziai.Models;

public record OrderFlower//(Order Order, Flower Flower)
{
    public OrderFlower(Guid id, Order order, Flower flower)
    {
        Id = id;
        Order = order;
        Flower = flower;
    }

    public OrderFlower()
    {
    }

    public Guid Id { get; init; }
    public Order Order { get; init; }
    public Flower Flower { get; init; }
}

