using Kankoreziai.Models;

namespace Kankoreziai.Services
{
    public interface IUserService
    {
        public Task<User> GetUser(int id);
        public Task<User> GetUser(string email);
        public bool HasPermission(User user, string permission);
        public Task<bool> HasPermission(string email, string permission);
    }
}
