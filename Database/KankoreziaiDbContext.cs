using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }

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
            new Quantity(5));
        var product2 = new Product(
            Guid.NewGuid(),
            "Daisy",
            new Price(105),
            "Much wow",
            new Thumbnail("d"),
            new Pictures(new List<string> { "e", "f" }),
            new Quantity(12));
        Products.AddRange(new List<Product>() { product1, product2 });
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
