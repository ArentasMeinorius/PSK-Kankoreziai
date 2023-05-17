namespace Kankoreziai.Models;

public record Product(Guid Id, string Name, Price Price, string Description, Pictures Pictures, Quantity Quantity);