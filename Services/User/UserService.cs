using Kankoreziai.Database;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Services.Users
{
    public class UserService : IUserService
    {
        private readonly KankoreziaiDbContext _context;
        public UserService(KankoreziaiDbContext kankoreziaiDbContext)
        {
            _context = kankoreziaiDbContext;
        }

        public async Task<User?> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetUser(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        public bool HasPermission(User user, string permission)
        {
            return user.Permissions.Contains(permission);
        }

        public async Task<bool> HasPermission(string email, string permission)
        {
            var user = await GetUser(email);
            if (user == null)
            {
                return false;
            }
            return HasPermission(user, permission); 
        }
    }
}
