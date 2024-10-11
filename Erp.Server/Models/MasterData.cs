using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class MasterData { 
    
        [Key]
        [Display(Name = "Id")]
        public int md_id { get; set; }

        [Display(Name = "Full Name")]
        public string? md_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string? md_active_yn { get; set; } = "Y";

        [Display(Name = "Type")]
        public string? md_type { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? md_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? md_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm:ss}", ApplyFormatInEditMode = true)]
        public DateTime  md_cre_date { get; set; } = DateTime.Now;

    }
}
