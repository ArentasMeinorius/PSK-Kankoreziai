using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public Task<List<Product>> GetAll()
    {
        return _repository.GetAll();
    }

    public Task<Result<Product>> Get(Guid id)
    {
        return _repository.Get(id);
    }

    public Task<Product> Add(ProductDto entity)
    {
        var product = new Product(
            Guid.NewGuid(),
            entity.Name,
            entity.Price,
            entity.Description,
            entity.Thumbnail,
            entity.Pictures,
            entity.Quantity,
            entity.Category);
        return _repository.Add(product);
    }

    public async Task<Result<Product>> Update(Guid id, ProductDto newEntity)
    {
        var oldProductResult = await _repository.Get(id);
        if (oldProductResult.IsFailed)
        {
            return Result.Fail(oldProductResult.Reasons.Select(x => x.Message));
        }
        var changedProduct = oldProductResult.Value with
        {
            Name = newEntity.Name,
            Price = newEntity.Price
        };
        await _repository.Delete(oldProductResult.Value.Id);
        var newProduct = await _repository.Add(changedProduct);
        return Result.Ok(newProduct);
    }

    public Task<Result<Guid>> Delete(Guid id)
    {
        return _repository.Delete(id);
    }
}