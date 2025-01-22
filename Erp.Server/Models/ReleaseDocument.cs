using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class ReleaseDocument
    {

        [Key]
        [Display(Name = "Id")]
        public int rd_id { get; set; }

        [Display(Name = "emp id")]
        public int? rd_emp_id { get; set; }

        [Display(Name = "emp name")]
        public string? rd_emp_name { get; set; } = string.Empty;

        [Display(Name = "passport no")]
        public string? rd_passport_no { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int? rd_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? rd_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created Date")]
        [DataType(DataType.Date)]
        public DateTime? rd_cre_date { get; set; } = DateTime.Now;

        [Display(Name = "released to")]
        public int? rd_released_to { get; set; }

        [Display(Name = "released name")]
        public string? rd_released_name { get; set; } = string.Empty;

        [Display(Name = "released date")]
        public DateTime? rd_released_date { get; set; } = DateTime.Now;

        [Display(Name = "Reason")]
        public string? rd_reason { get; set; } = string.Empty;

        [Display(Name = "Received By")]
        public string? rd_received_yn { get; set; } = string.Empty;

        [Display(Name = "Received By")]
        public int? rd_received_by { get; set; }

        [Display(Name = "Received By")]
        public string? rd_received_by_name { get; set; }

        [Display(Name = "Received Date")]
        public DateTime? rd_received_date { get; set; } 




    }

}
