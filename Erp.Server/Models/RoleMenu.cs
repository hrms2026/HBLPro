using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class RoleMenu
    {

        [Key]
        [Display(Name = "Id")]
        public int rm_id { get; set; }

        [Display(Name = "Role")]
        public int rm_role { get; set; }

        [Display(Name = "Role")]
        public int rm_menu { get; set; }

        [Display(Name = "Created By")]
        public int? rm_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? r_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime rm_cre_date { get; set; } = DateTime.Now;

    }
}
