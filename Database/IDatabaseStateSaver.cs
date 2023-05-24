namespace Kankoreziai.Database;

public interface IDatabaseStateSaver
{
    Task SaveChanges();
}