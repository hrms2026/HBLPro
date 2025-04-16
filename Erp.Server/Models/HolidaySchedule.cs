using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class HolidaySchedule
    {
        [Key]
        [Display(Name = "company id")]
        public int? hs_id { get; set; } = 0;

        [Display(Name = "company")]
        public int? hs_company_id { get; set; } = 0;

        [Display(Name = "reason")]
        public string? hs_reason { get; set; } = string.Empty;
        
        [Display(Name = "from date")]
        [DataType(DataType.Date)]
        public DateTime? hs_leave_from { get; set; } = DateTime.Now;

        [Display(Name = "to date")]
        [DataType(DataType.Date)]
        public DateTime? hs_leave_to { get; set; } = DateTime.Now;

        [Display(Name = "Created By")]
        public int? hs_cre_by { get; set; } = 0;


        [Display(Name = "Created By")]
        public string? hs_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
       
        public DateTime? hs_cre_date { get; set; } 
    }



}
