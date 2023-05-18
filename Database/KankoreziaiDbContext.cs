using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<InventoryChange> InventoryChanges { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasConversion(
                price => price.Cents,
                value => new Price(value)
            );
        modelBuilder.Entity<Product>()
            .Property(p => p.Thumbnail)
            .HasConversion(
                thumbnail => thumbnail.Link,
                thumbnail => new Thumbnail(thumbnail)
            );
        modelBuilder.Entity<Product>()
            .Property(p => p.Pictures)
            .HasConversion(
                pictures => FormatPictures(pictures),
                pictures => ParsePictures(pictures)
            );
        modelBuilder.Entity<Product>()
            .Property(p => p.Quantity)
            .HasConversion(
                quantity => quantity.Units,
                quantity => new Quantity(quantity)
            );
        modelBuilder.Entity<User>()
            .Property(u => u.Permissions)
            .HasConversion(
                permissions => string.Join(',', permissions),
                value => value.Split(',', StringSplitOptions.None).ToList()
            );

        modelBuilder.Entity<InventoryChange>()
            .Property(ic => ic.Quantity)
            .HasConversion(
                quantity => quantity.Units,
                quantity => new Quantity(quantity)
            );
    }

    public void InitializeData()
    {
        var product1 = new Product(
            Guid.NewGuid(),
            "Rose",
            new Price(501),
            "Very flower",
            new Thumbnail("a"),
            new Pictures(new List<string> { "b", "c" }),
            new Quantity(5),
            ProductCategory.Flower);
        var product2 = new Product(
            Guid.NewGuid(),
            "Daisy",
            new Price(105),
            "Much wow",
            new Thumbnail("d"),
            new Pictures(new List<string> { "e", "f" }),
            new Quantity(12),
            ProductCategory.Flower);


        var order1 = new Order(Guid.NewGuid(), new List<InventoryChange> { }, DateTime.UtcNow, DateTime.UtcNow);
        var order2 = new Order(Guid.NewGuid(), new List<InventoryChange> { }, DateTime.UtcNow, DateTime.MinValue);
        var order3 = new Order(Guid.NewGuid(), new List<InventoryChange> { }, DateTime.UtcNow, DateTime.UtcNow);
        order1.InventoryChanges.AddRange(new List<InventoryChange>() { new(Guid.NewGuid(), order1.Id, product1, new Quantity(3)) });
        order2.InventoryChanges.AddRange(new List<InventoryChange>() { new(Guid.NewGuid(), order2.Id, product1, new Quantity(5)), new(Guid.NewGuid(), order2.Id, product2, new Quantity(5)) });
        Orders.AddRange(new List<Order>() { order1, order2, order3 });
        Products.AddRange(new List<Product>() { product1, product2 });
        Users.AddRange(new List<User>() { new() { Email = "testemail@gmail.com", Permissions = new(new[] { "items.see", "items.manage" }) } });
        SaveChanges();
    }

    private static string FormatPictures(Pictures pictures)
    {
        return string.Join(',', pictures.Links);
    }

    private static Pictures ParsePictures(string pictures)
    {
        return new Pictures(pictures.Split(',').ToList());
    }
}
