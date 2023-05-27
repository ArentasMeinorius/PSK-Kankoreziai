using FluentResults;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database
{
    public class CartRepository : ICartRepository
    {
        private readonly KankoreziaiDbContext _context;

        public CartRepository(KankoreziaiDbContext context)
        {
            _context = context;
        }

        public Task<List<Cart>> GetAll()
        {
            return _context.Carts.ToListAsync();
        }

        public async Task<Result<Cart>> Get(Guid id)
        {
            var item = await _context.Carts
                .Include(x => x.CartItems)
                .FirstOrDefaultAsync(cart => cart.Guid == id);
            if (item == null)
            {
                return Result.Fail("Did not find order");
            }
            return Result.Ok(item);
        }

        public async Task<Cart> Add(Cart entity)
        {
            await _context.Carts.AddAsync(entity);
            return entity;
        }

        public async Task<Result<Guid>> Delete(Guid id)
        {
            var oldCart = await Get(id);
            if (oldCart.IsFailed)
            {
                return Result.Fail(oldCart.Reasons.Select(x => x.Message));
            }

            _context.Carts.Remove(oldCart.Value);
            return Result.Ok(id);
        }

        public Task SaveChanges()
        {
            return _context.SaveChangesAsync();
        }
    }
}
