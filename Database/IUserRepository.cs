using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database
{
    public interface IUserRepository
    {
        Task<List<User>> GetAll();
        Task<Result<User>> Get(Guid id);
        Task<Result<User>> Get(string email);
        Task<User> Add(User entity);
        Task<Result<Guid>> Delete(Guid id);
        Task SaveChanges();
    }
}
