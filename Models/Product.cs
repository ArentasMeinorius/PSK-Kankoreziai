namespace Kankoreziai.Models;

public record Product(Guid Id, string Name, Price Price, string Description, Thumbnail Thumbnail, Pictures Pictures, Quantity Quantity);