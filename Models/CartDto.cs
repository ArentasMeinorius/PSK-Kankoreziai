namespace Kankoreziai.Models
{
    public record CartDto(List<CartItemDto> CartItems);

    public record CartItemDto(Guid ProductId, Quantity Quantity);
}
