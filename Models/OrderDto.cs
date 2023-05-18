namespace Kankoreziai.Models;

public record OrderDto(List<Product> Products, DateTime UpdatedAt, DateTime CreatedAt);