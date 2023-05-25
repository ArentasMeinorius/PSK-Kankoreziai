using FluentResults;
using Kankoreziai.Database;
using Kankoreziai.Models;

namespace Kankoreziai.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(
        IProductRepository repository)
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

    public async Task<Product> Add(ProductDto entity)
    {
        var product = new Product(
            Guid.NewGuid(),
            entity.Name,
            entity.Price,
            entity.Description,
            entity.Thumbnail,
            entity.Pictures,
            entity.Quantity,
            entity.Category,
            entity.Season);
        var result = await _repository.Add(product);
        await _repository.SaveChanges();
        return result;
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
        var deleteResult = await _repository.Delete(oldProductResult.Value.Id);
        if (deleteResult.IsFailed)
        {
            return Result.Fail(deleteResult.Reasons.Select(x => x.Message));
        }
        var newProduct = await _repository.Add(changedProduct);
        await _repository.SaveChanges();
        return Result.Ok(newProduct);
    }

    public async Task<Result<Guid>> Delete(Guid id)
    {
        var result = await _repository.Delete(id);
        if (result.IsFailed)
        {
            return result;
        }
        await _repository.SaveChanges();
        return result;
    }
}