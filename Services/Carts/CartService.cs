using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;

namespace Kankoreziai.Services.Carts
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<Result<Cart>> Get(Guid id)
        {
            return await _cartRepository.Get(id);
        }


        public async Task<Result<Cart>> Update(Guid cartId, List<CartItemDto> cartItemDtos)
        {
            var cartResult = await _cartRepository.Get(cartId);
            if (cartResult.IsFailed)
            {
                return Result.Fail<Cart>(cartResult.Reasons.Select(x => x.Message));
            }

            var cart = cartResult.Value;

            var cartItems = new List<CartItem>();
            foreach (var cartItemDto in cartItemDtos)
            {
                var productResult = await _productRepository.Get(cartItemDto.ProductId);
                if (productResult.IsFailed)
                {
                    return Result.Fail<Cart>(productResult.Reasons.Select(x => x.Message));
                }
                var product = productResult.Value;
                var cartItem = new CartItem
                {
                    CartId = cart.Guid,
                    ProductId = product.Id,
                    Quantity = cartItemDto.Quantity
                };
                cartItems.Add(cartItem);
            }

            cart.CartItems = cartItems;
            await _cartRepository.SaveChanges();
            return Result.Ok(cart);
        }

    }
}
