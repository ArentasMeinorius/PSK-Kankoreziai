namespace Kankoreziai.Database;

public class DatabaseStateSaver : IDatabaseStateSaver
{
    private readonly KankoreziaiDbContext _context;
    public DatabaseStateSaver(KankoreziaiDbContext context)
    {
        _context = context;
    }

    public Task SaveChanges()
    {
        return _context.SaveChangesAsync();
    }
}