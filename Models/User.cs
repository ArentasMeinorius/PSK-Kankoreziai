using System.Numerics;

namespace Kankoreziai.Models
{
    public record User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<string> Permissions { get; set; } = new();
    }
}
