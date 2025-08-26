using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Incentive
    {
        [Key]
        [Display(Name = "id")]
        public int? i_id { get; set; } = 0;

        [Display(Name = "user id")]
        public int? i_user { get; set; } =0;


        [Display(Name = "user")]
        public string? i_user_name { get; set; } = string.Empty;


        [Display(Name = "month")]
        public string? i_month { get; set; } = string.Empty;

        [Display(Name = "Amount")]
        public Decimal? i_amount { get; set; } 

        [Display(Name = "payment type")]
        public int? i_payment_type { get; set; } = 0;

        [Display(Name = "payment type")]
        public string? i_payment_type_name { get; set; } = string.Empty;


        [Display(Name = "reason")]
        public string? i_reason { get; set; } = string.Empty;

        [Display(Name = "created by")]
        public int i_cre_by { get; set; } = 0;

        [Display(Name = "created by name")]
        public string? i_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime i_cre_date { get; set; } = DateTime.Now;

    }



}
