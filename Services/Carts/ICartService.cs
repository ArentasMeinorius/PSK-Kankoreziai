using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Services.Carts
{
    public interface ICartService
    {
        Task<Result<Cart>> Update(Guid cartId, List<CartItemDto> cartItemDtos);
        Task<Result<Cart>> Get(Guid id);
    }
}
