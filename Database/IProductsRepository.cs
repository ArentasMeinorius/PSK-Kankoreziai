using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IProductsRepository
{
    IList<Product> GetAll();
    ValueTask<Product?> Get(Guid id);
    Task<Product> Add(Product entity);
    Task Add(IList<Product> entities);
    Task<Guid> Delete(Product entity);
}