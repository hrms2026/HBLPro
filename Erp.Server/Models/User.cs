using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class User { 
    
        [Key]
        [Display(Name = "Id")]
        public int u_id { get; set; }

        [Display(Name = "Full Name")]
        public string? u_name { get; set; } = string.Empty;

        [Display(Name = "Username")]
        public string? u_username { get; set; } = string.Empty;

        [Display(Name = "Password")]
        public string? u_password { get; set; } = string.Empty;

        [Display(Name = "Email")]
        public string? u_email { get; set; } = string.Empty;

        [Display(Name = "Role Id")]
        public int?   u_role_id { get; set; }

        [Display(Name = "Role Id")]
        public string? u_role_name { get; set; } = string.Empty;

        [Display(Name = "is Admin")]
        public string? u_is_admin { get; set; } = "N";

        [Display(Name = "Active")]
        public string? u_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? u_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? u_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  u_cre_date { get; set; } = DateTime.Now;

    }
}
