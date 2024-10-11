using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Income
    {
        [Key]
        [Display(Name = "Id")]
        public int i_id { get; set; }

        [Display(Name = "Category")]
        public int i_category { get; set; }

        [Display(Name = "Category")]
        public string? i_category_name { get; set; } = string.Empty;

        [Display(Name = "Date of Income")]
        [DataType(DataType.Date)]
        public DateTime? i_income_date { get; set; } = DateTime.Now;

        [Display(Name = "Amount")]
        public decimal? i_amount { get; set; }

        [Display(Name = "Payment Method")]
        public int? i_payment_method { get; set; }

        [Display(Name = "Payment Method")]
        public string? i_payment_method_name { get; set; }

        [Display(Name = "Remarks")]
        public string? i_remarks { get; set; }

        [Display(Name = "Created By")]
        public int? i_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? i_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime i_cre_date { get; set; } = DateTime.Now;
    }

}
