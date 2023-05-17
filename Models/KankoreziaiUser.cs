using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Kankoreziai.Models
{
    public record KankoreziaiUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public string Email { get; set; }
        public List<string> Permissions { get; set; } = new();
    }
}
