using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Expense
    { 
    
        [Key]
        [Display(Name = "Id")]
        public int e_id { get; set; }

        [Display(Name = "Category")]
        public int e_category { get; set; } 

        [Display(Name = "Category")]
        public string? e_category_name { get; set; } = string.Empty;

        [Display(Name = "Date of Expense")]
        [DataType(DataType.Date)]
        public DateTime? e_expense_date { get; set; } = DateTime.Now;

        [Display(Name = "Amount")]
        public decimal? e_amount { get; set; }

        [Display(Name = "Payment Method")]
        public int? e_payment_method { get; set; }

        [Display(Name = "Payment Method")]
        public string? e_payment_method_name { get; set; }

        [Display(Name = "Remarks")]
        public string? e_remarks { get; set; }

        [Display(Name = "Created By")]
        public int? e_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? e_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  e_cre_date { get; set; } = DateTime.Now;

    }
}
