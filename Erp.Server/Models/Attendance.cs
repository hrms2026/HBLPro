using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Attendance { 
    
        [Key]
        [Display(Name = "Id")]
        public int att_id { get; set; }

        [Display(Name = "employee id")]
        public int? att_emp_id { get; set; }

        [Display(Name = "employee")]
        public string? att_emp_name { get; set; }

        [Display(Name = "punch time")]
        public DateTime? att_punch_time { get; set; } 

        [Display(Name = "punch type")]
        public string? att_punch_type { get; set; } = string.Empty;

        [Display(Name = "machine id")]
        public int? att_machine_id { get; set; }

        [Display(Name = "machine")]
        public string? att_machine_name { get; set; }

        [Display(Name = "created on")]
        public DateTime? att_cre_date { get; set; } 


    }
}
