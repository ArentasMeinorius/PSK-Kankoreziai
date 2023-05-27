using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;
using Microsoft.EntityFrameworkCore;

namespace Kankoreziai.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<Result<User>> Get(Guid id)
        {
            return _userRepository.Get(id);
        }

        public Task<Result<User>> Get(string email)
        {
            return _userRepository.Get(email);
        }

        public bool HasPermission(User user, string permission)
        {
            return user.Permissions.Contains(permission);
        }

        public async Task<bool> HasPermissionAsync(string email, string permission)
        {
            var userResult = await Get(email);
            if (userResult.IsFailed)
            {
                return false;
            }
            return HasPermission(userResult.Value, permission); 
        }

        public async Task<User> GetOrCreate(string email)
        {
            var userResult = await Get(email);

            if (userResult.IsSuccess)
            {
                return userResult.Value;
            }

            var user = new User
            {
                Email = email,
                Permissions = new List<string>()
            };
            await _userRepository.Add(user);
            await _userRepository.SaveChanges();
            return user;

        }
    }
}
