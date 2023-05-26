using FluentResults;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Database
{
    public class UserRepository : IUserRepository
    {
        private readonly KankoreziaiDbContext _context;

        public UserRepository(KankoreziaiDbContext context)
        {
            _context = context;
        }

        public Task<List<User>> GetAll()
        {
            return _context.Users.ToListAsync();
        }

        public async Task<Result<User>> Get(Guid id)
        {
            var item = await _context.Users.FirstOrDefaultAsync(user => user.Guid == id);
            if (item == null)
            {
                return Result.Fail("Did not find user");
            }
            return Result.Ok(item);
        }

        public async Task<Result<User>> Get(string email)
        {
            var item = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
            if (item == null)
            {
                return Result.Fail("Did not find user");
            }
            return Result.Ok(item);
        }

        public async Task<User> Add(User entity)
        {
            await _context.Users.AddAsync(entity);
            return entity;
        }

        public async Task<Result<Guid>> Delete(Guid id)
        {
            var oldUser = await Get(id);
            if (oldUser.IsFailed)
            {
                return Result.Fail(oldUser.Reasons.Select(x => x.Message));
            }

            _context.Users.Remove(oldUser.Value);
            return Result.Ok(id);
        }

        public Task SaveChanges()
        {
            return _context.SaveChangesAsync();
        }
    }
}
