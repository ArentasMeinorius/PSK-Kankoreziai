using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database;

public class KankoreziaiDbContext : DbContext
{
    public KankoreziaiDbContext(DbContextOptions<KankoreziaiDbContext> options)
        : base(options) { }

    public DbSet<Flower> Flowers { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Flower>()
            .Property(f => f.Price)
            .HasConversion(
                price => price.Cents,
                value => new Price(value)
            );

        modelBuilder.Entity<User>()
            .Property(u => u.Permissions)
            .HasConversion(
                permissions => string.Join(',', permissions),
                value => value.Split(',', StringSplitOptions.None).ToList()
            );
    }

    public void InitializeData()
    {
        Flowers.AddRange(new List<Flower>() { new (Guid.NewGuid(), "Rose", new Price(501)), new (Guid.NewGuid(), "Daisy", new Price(105)) });
        Users.AddRange(new List<User>() { new() { Email = "testemail@gmail.com", Permissions = new(new[] { "items.see", "items.manage" }) } });
        SaveChanges();
    }
}
