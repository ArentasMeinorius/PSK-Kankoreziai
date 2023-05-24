using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IProductsRepository
{
    IList<Product> GetAll();
    Task<Result<Product>> Get(Guid id);
    Task<Product> Add(Product entity);
    Task<Result<Guid>> Delete(Guid id);
}