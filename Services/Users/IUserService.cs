using Kankoreziai.Models;

namespace Kankoreziai.Services.Users
{
    public interface IUserService
    {
        ValueTask<User?> GetUserAsync(int id);
        Task<User?> GetUserAsync(string email);
        bool HasPermission(User user, string permission);
        Task<bool> HasPermissionAsync(string email, string permission);
    }
}
