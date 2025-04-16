using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Salarygeneration { 
    
        [Key]
        [Display(Name = "Id")]
        public int sg_company { get; set; }

        [Display(Name = "year id")]
        public int? sg_year { get; set; }

        [Display(Name = "year name")]
        public string? sg_year_name { get; set; } = string.Empty;

        [Display(Name = "employee name")]
        public string? sg_employee_name { get; set; } = string.Empty;

        [Display(Name = "personal id")]
        public int? sg_personal_id { get; set; }

        [Display(Name = "employee code")]
        public string? sg_employee_code { get; set; } = string.Empty;

        [Display(Name = "account no")]
        public string? sg_acc_no { get; set; } = string.Empty;

        [Display(Name = "present salary")]
        public int? sg_present_salary { get; set; } = 0;

        [Display(Name = "attendance remarks")]
        public string? sg_attendance_remark { get; set; } = string.Empty;

        [Display(Name = "basic salary")]
        public int? sg_basic_salary { get; set; } = 0;

        [Display(Name = "variable salary")]
        public int? sg_variable_salary { get; set; } = 0;

        [Display(Name = "cash part")]
        public int? sg_cash_part { get; set; } = 0;

        [Display(Name = "total salary")]
        public int? sg_total_salary { get; set; } = 0;

        [Display(Name = "due to")]
        public string? sg_due_to { get; set; } = string.Empty;

        [Display(Name = "due from")]
        public string? sg_due_from { get; set; } = string.Empty;

        [Display(Name = "uae exchange transfer")]
        public string? sg_uae_exchange_transfer { get; set; } = string.Empty;

        [Display(Name = "variable transfer")]
        public string? sg_variable_transfer { get; set; } = string.Empty;

        [Display(Name = "created on")]
        public DateTime? sg_cre_date { get; set; } 


    }
}
