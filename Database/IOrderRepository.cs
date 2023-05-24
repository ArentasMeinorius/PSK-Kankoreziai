using Kankoreziai.Models;

namespace Kankoreziai.Database;

public interface IOrderRepository
{
    IList<Order> GetAll();
    Task<Order?> Get(Guid id);
    Task<Order> Add(Order entity);
    Task<Guid> Delete(Order entity);
}