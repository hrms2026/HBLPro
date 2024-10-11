using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Supplier { 
    
        [Key]
        [Display(Name = "Id")]
        public int s_id { get; set; }

        [Display(Name = "Name")]
        public string? s_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string? s_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? s_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? s_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  s_cre_date { get; set; } = DateTime.Now;

    }
}
