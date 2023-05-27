using Kankoreziai.Models;

namespace Kankoreziai.Services.Authentication
{
    public interface IAuthenticationService
    {
        User? User { get; }
    }
}
