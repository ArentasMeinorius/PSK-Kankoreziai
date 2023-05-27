using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface ICartRepository
{
    Task<List<Cart>> GetAll();
    Task<Result<Cart>> Get(Guid id);
    Task<Cart> Add(Cart entity);
    Task<Result<Guid>> Delete(Guid id);
    Task SaveChanges();
}