using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Login
    {

        [Display(Name = "Username")]
        public string? username { get; set; } = string.Empty;

        [Display(Name = "Password")]
        public string? password { get; set; } = string.Empty;
    }
}
