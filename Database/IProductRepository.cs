using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IProductRepository
{
    Task<List<Product>> GetAll();
    Task<Result<Product>> Get(Guid id);
    Task<Product> Add(Product entity);
    Task<Result<Guid>> Delete(Guid id);
    Task SaveChanges();
    Task<Result<Product>> UpdateFirstException();
}