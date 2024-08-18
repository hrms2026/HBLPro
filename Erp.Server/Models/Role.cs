using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Role { 
    
        [Key]
        [Display(Name = "Id")]
        public int r_id { get; set; }

        [Display(Name = "Full Name")]
        public string? r_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string? r_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? r_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? r_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  r_cre_date { get; set; } = DateTime.Now;

    }
}
