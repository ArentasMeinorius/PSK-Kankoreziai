using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IOrdersRepository
{
    IList<Order> GetAll();
    Task<Order?> Get(Guid id);
    Task<Order> Add(Order entity);
    Task<Guid> Delete(Order entity);
}