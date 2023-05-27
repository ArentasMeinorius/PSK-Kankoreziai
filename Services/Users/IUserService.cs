using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Services.Users
{
    public interface IUserService
    {
        Task<Result<User>> Get(string email);
        Task<Result<User>> Get(Guid id);
        bool HasPermission(User user, string permission);
        Task<bool> HasPermissionAsync(string email, string permission);
        Task<User> GetOrCreate(string email);
    }
}
