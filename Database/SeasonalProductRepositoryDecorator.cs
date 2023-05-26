using FluentResults;
using Kankoreziai.Models;
using Microsoft.Extensions.Options;

namespace Kankoreziai.Database;

public class SeasonalProductRepositoryDecorator : IProductRepository
{
    private readonly ProductSeason _seasonalFilter;
    private readonly IProductRepository _underlyingRepository;

    public SeasonalProductRepositoryDecorator(
        IOptions<SeasonalProductRepositoryDecoratorOptions> options,
        IProductRepository underlyingRepository)
    {
        _seasonalFilter = options.Value.Filter;
        _underlyingRepository = underlyingRepository;
    }

    public async Task<List<Product>> GetAll()
    {
        var products = await _underlyingRepository.GetAll();
        return products.Where(x => (x.Season & _seasonalFilter) == _seasonalFilter).ToList();
    }

    public Task<Result<Product>> Get(Guid id)
    {
        return _underlyingRepository.Get(id);
    }

    public Task<Product> Add(Product entity)
    {
        return _underlyingRepository.Add(entity);
    }

    public Task<Result<Guid>> Delete(Guid id)
    {
        return _underlyingRepository.Delete(id);
    }

    public Task SaveChanges()
    {
        return _underlyingRepository.SaveChanges();
    }

    public Task<Result<Guid>> DeleteFirstException()
    {
        return _underlyingRepository.DeleteFirstException();
    }
}