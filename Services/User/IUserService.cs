using Kankoreziai.Models;

namespace Kankoreziai.Services.User
{
    public interface IUserService
    {
        ValueTask<KankoreziaiUser?> GetUserAsync(int id);
        Task<KankoreziaiUser?> GetUserAsync(string email);
        bool HasPermission(KankoreziaiUser kankoreziaiUser, string permission);
        Task<bool> HasPermissionAsync(string email, string permission);
    }
}
