using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Category { 
    
        [Key]
        [Display(Name = "Id")]
        public int ct_id { get; set; }

        [Display(Name = "Full Name")]
        public string? ct_name { get; set; } = string.Empty;

        [Display(Name = "Type")]
        public string? ct_type { get; set; } = "Y";

        [Display(Name = "Active")]
        public string? ct_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? ct_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? ct_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  ct_cre_date { get; set; } = DateTime.Now;

    }
}
