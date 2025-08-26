using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Promotion
    {
        [Key]

        [Display(Name = "Id")]
        public int? p_id { get; set; } = 0;

        [Display(Name = "company id")]
        public int? p_company_id { get; set; } = 0;

        [Display(Name = "company name")]
        public string? p_company_name { get; set; } = string.Empty;


        [Display(Name = "user")]
        public int? p_user { get; set; } = 0;

        [Display(Name = "user name")]
        public string? p_user_name { get; set; } = string.Empty;

        [Display(Name = "designation")]
        public int? p_designation { get; set; } = 0;

        [Display(Name = "designation name")]
        public string? p_designation_name { get; set; } = string.Empty;

        [Display(Name = "Date")]
        [DataType(DataType.Date)]
        public DateTime p_date { get; set; } = DateTime.Now;

        [Display(Name = "basic salary")]
        public int? p_basic_salary { get; set; } = 0;

        [Display(Name = "allowance")]
        public int? p_allowance { get; set; } = 0;

        [Display(Name = "cash part")]
        public int? p_cash_part { get; set; } = 0;

        [Display(Name = "current salary")]
        public int? p_current_salary { get; set; } = 0;

        [Display(Name = "Created By")]
        public int? p_cre_by { get; set; } = 0;


        [Display(Name = "Created By")]
        public string? p_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime? p_cre_date { get; set; } = DateTime.Now;
    }



}
