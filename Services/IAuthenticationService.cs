using Kankoreziai.Models;

namespace Kankoreziai.Services
{
    public interface IAuthenticationService
    {
        User? User { get; }
    }
}
