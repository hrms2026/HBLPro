using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Credentials
    {
        [Key]
        [Display(Name = "Id")]
        public int id { get; set; }

        [Display(Name = "Username")]
        public string? username { get; set; } = string.Empty;

        [Display(Name = "Message")]
        public string? message { get; set; } = string.Empty;

        [Display(Name = "Token")]
        public string? token { get; set; } = string.Empty;

        [Display(Name = "user")]
        public User? user { get; set; } = new User();

    }
}
