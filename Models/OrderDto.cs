namespace Kankoreziai.Models;

public record OrderDto(List<Flower> Flowers, DateTime UpdatedAt, DateTime CreatedAt);