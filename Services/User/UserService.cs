using Kankoreziai.Database;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Services
{
    public class UserService : IUserService
    {
        private readonly KankoreziaiDbContext _context;
        public UserService(KankoreziaiDbContext kankoreziaiDbContext)
        {
            _context = kankoreziaiDbContext;
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUser(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        public bool HasPermission(User user, string permission)
        {
            if (user == null)
            {
                return false;
            }
            return user.Permissions.Contains(permission);
        }

        public async Task<bool> HasPermission(string email, string permission)
        {
            User user = await GetUser(email);
            return HasPermission(user, permission); 
        }
    }
}
