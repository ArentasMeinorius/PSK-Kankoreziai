using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Flower> Flowers { get; set; }

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
        Flowers.AddRange(new List<Flower>() { new (Guid.NewGuid(), "Rose", new Price(501)), new (Guid.NewGuid(), "Daisy", new Price(105)) });
        SaveChanges();
    }
}
