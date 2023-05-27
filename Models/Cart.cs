using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Kankoreziai.Models
{
    public record Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public List<CartItem> CartItems { get; set; }

        public Cart()
        {

        }
        public Cart(Guid guid)
        {
            Guid = guid;
            CartItems = new List<CartItem>();
        }
    }
}
