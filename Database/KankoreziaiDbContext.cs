using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }

    public DbSet<Cart> Carts { get; set; }

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

        modelBuilder.Entity<OrderProduct>()
            .Property(op => op.Quantity)
            .HasConversion(
                quantity => quantity.Units,
                quantity => new Quantity(quantity)
            );

        modelBuilder.Entity<CartItem>()
        .Property(ci => ci.Quantity)
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
            new Thumbnail("https://www.theflowerweb.com.au/wp-content/uploads/2019/01/single-rose.jpg"),
            new Pictures(new List<string> { "https://cdn.shopify.com/s/files/1/0073/4740/4882/products/IMG_8409_5000x.jpg?v=1653807371", "https://i.pinimg.com/originals/83/1f/af/831faf53e6bb6a551ef030e968b9f42b.jpg" }),
            new Quantity(5),
            ProductCategory.Flower,
            ProductSeason.AllSeason);
        var product2 = new Product(
            Guid.NewGuid(),
            "Daisy",
            new Price(105),
            "Much wow",
            new Thumbnail("https://springbreakisland-de.ams3.digitaloceanspaces.com/woocommerce-placeholder.png"),
            new Pictures(new List<string> { "https://springbreakisland-de.ams3.digitaloceanspaces.com/woocommerce-placeholder.png", "https://springbreakisland-de.ams3.digitaloceanspaces.com/woocommerce-placeholder.png" }),
            new Quantity(12),
            ProductCategory.Flower,
            ProductSeason.Autumn);


        var order1 = new Order(Guid.NewGuid(), new List<OrderProduct> { }, OrderStatus.PaymentAccepted, DateTime.UtcNow, DateTime.UtcNow);
        var order2 = new Order(Guid.NewGuid(), new List<OrderProduct> { }, OrderStatus.AwaitingPayment, DateTime.UtcNow, DateTime.MinValue);
        var order3 = new Order(Guid.NewGuid(), new List<OrderProduct> { }, OrderStatus.PaymentRejected, DateTime.UtcNow, DateTime.UtcNow);
        order1.OrderProducts.AddRange(new List<OrderProduct>() { new(Guid.NewGuid(), order1.Id, product1, new Quantity(3)) });
        order2.OrderProducts.AddRange(new List<OrderProduct>() { new(Guid.NewGuid(), order2.Id, product1, new Quantity(5)), new(Guid.NewGuid(), order2.Id, product2, new Quantity(5)) });
        Orders.AddRange(new List<Order>() { order1, order2, order3 });
        Products.AddRange(new List<Product>() { product1, product2 });
        Users.AddRange(new List<User>() { new() { Email = "testadmin@gmail.com", Permissions = new(new[] { "items.see", "items.manage", "products.create", "products.delete", "products.update", "orders.all", "orders.edit", "orders.delete" }) } });
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
