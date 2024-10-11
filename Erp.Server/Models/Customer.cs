using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Customer
    { 
    
        [Key]
        [Display(Name = "Id")]
        public int c_id { get; set; }

        [Display(Name = "Name")]
        public string? c_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string? c_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? c_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? c_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  c_cre_date { get; set; } = DateTime.Now;

    }
}
