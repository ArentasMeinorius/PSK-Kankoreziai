using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Kankoreziai.Models
{

    public record CartItem {
        [JsonIgnore]
        public Guid Id { get; set; }
        [JsonIgnore]
        public Guid CartId { get; init; }
        public Guid ProductId { get; set; }
        public Quantity Quantity { get; set; }
    };
}
