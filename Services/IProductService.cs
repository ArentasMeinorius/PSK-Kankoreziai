using FluentResults;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public interface IProductService
{
    Task<List<Product>> GetAll();
    Task<Result<Product>> Get(Guid id);
    Task<Product> Add(ProductDto entity);
    Task<Result<Product>> Update(Guid id, ProductDto newEntity);
    Task<Result<Guid>> DeleteFirstException();
    Task<Result<Guid>> Delete(Guid id);
}