using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class LeaveApprovalHistory { 
    
        [Key]
        [Display(Name = "Id")]
        public int lh_id { get; set; }

        [Display(Name = "ApprovalID")]
        public int? lh_lr_id { get; set; }

        [Display(Name = "status")]
        public int? lh_status { get; set; }

        [Display(Name = "status")]
        public string? lh_status_name { get; set; } = string.Empty;


        [Display(Name = "created by")]
        public int? lh_cre_by{ get; set; }

        [Display(Name = "created by")]
        public string? lh_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "created on")]
        public DateTime? lh_cre_date { get; set; } 


    }
}
