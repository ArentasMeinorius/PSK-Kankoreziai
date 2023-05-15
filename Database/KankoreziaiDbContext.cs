using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Flower> Flowers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderFlower> OrderFlowers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Flower>()
            .Property(f => f.Price)
            .HasConversion(
                price => price.Cents,
                value => new Price(value)
            );
    }

    public void InitializeData()
    {
        var flower1 = new Flower(Guid.NewGuid(), "Rose", new Price(501));
        var flower2 = new Flower(Guid.NewGuid(), "Daisy", new Price(105));
        var order1 = new Order(Guid.NewGuid(), new List<OrderFlower> { }, DateTime.UtcNow, DateTime.UtcNow);
        var order2 = new Order(Guid.NewGuid(), new List<OrderFlower> { }, DateTime.UtcNow, DateTime.MinValue);
        var order3 = new Order(Guid.NewGuid(), new List<OrderFlower> { }, DateTime.UtcNow, DateTime.UtcNow);
        order1.Flowers.AddRange(new List<OrderFlower>() {new (Guid.NewGuid(), order1, flower1) });
        order2.Flowers.AddRange(new List<OrderFlower>() {new (Guid.NewGuid(), order2, flower2) });
        // add repositories for items, Orders.include(flowers)
        Orders.AddRange(new List<Order>() { order1, order2, order3 });
        Flowers.AddRange(new List<Flower>() { flower1, flower2 });
        SaveChanges();
    }
}
