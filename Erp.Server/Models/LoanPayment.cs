using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class LoanPayment
    {
        [Key]
        [Display(Name = "LH id")]
        public int? lh_id { get; set; } = 0;


        [Display(Name = "Loan id")]
        public int? lh_loan_id { get; set; } = 0;

        [Display(Name = "Amount")]
        public Decimal? lh_amount { get; set; } 


        [Display(Name = "Remarks")]
        public string? lh_remark { get; set; } = string.Empty;


        [Display(Name = "Created By")]
        public int? lh_cre_by { get; set; } = 0;


        [Display(Name = "Created By")]
        public string lh_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        public DateTime lh_cre_date { get; set; } = DateTime.Now;
    }



}
