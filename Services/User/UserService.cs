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

        public ValueTask<User?> GetUserAsync(int id)
        {
            return _context.Users.FindAsync(id);
        }

        public Task<User?> GetUserAsync(string email)
        {
            return _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        public bool HasPermission(User user, string permission)
        {
            return user.Permissions.Contains(permission);
        }

        public async Task<bool> HasPermissionAsync(string email, string permission)
        {
            var user = await GetUserAsync(email);
            if (user == null)
            {
                return false;
            }
            return HasPermission(user, permission); 
        }
    }
}
