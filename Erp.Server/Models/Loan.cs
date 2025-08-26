using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Erp.Server.Models
{
    public class Loan
    {
        [Key]
        [Display(Name = "loan id")]
        public int? l_id { get; set; } = 0;

        [Display(Name = "user")]
        public int? l_user { get; set; } = 0;

        [Display(Name = "user name")]
        public string? l_user_name { get; set; } = string.Empty;


        [Display(Name = "company id")]
        public int? l_company_id { get; set; } = 0;

        [Display(Name = "company name")]
        public string? l_company_name { get; set; } = string.Empty;

     
        [Display(Name = "Amount")]
        public Decimal? l_amount { get; set; } 

       
        [Display(Name = "Paid Amount")]
        public Decimal? l_paid_amount { get; set; } = 0;

      
        [Display(Name = "Balance Amount")]
        public Decimal? l_balance_amount { get; set; } = 0;

        [Display(Name = "reason")]
        public string? l_reason { get; set; } = string.Empty;


        [Display(Name = "type")]
        public int? l_type { get; set; } = 0;

        [Display(Name = "type name")]
        public string? l_type_name { get; set; } = string.Empty;


        [Display(Name = "cutting amount")]
        public Decimal? l_cutting_amount { get; set; } 



        [Display(Name = "issue date")]
        [DataType(DataType.Date)]
        public DateTime l_issue_date { get; set; } = DateTime.Now;


        [Display(Name = "Created By")]
        public int? l_cre_by { get; set; } = 0;


        [Display(Name = "Created By")]
        public string? l_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        public DateTime? l_cre_date { get; set; } 
    }



}
