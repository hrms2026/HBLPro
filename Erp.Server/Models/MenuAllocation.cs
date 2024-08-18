using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class MenuAllocation
    {
        [Key]
        [Display(Name = "Id")]
        public int id { get; set; }

        [Display(Name = "Role")]
        public int role { get; set; }

        [Display(Name = "Menu Type")]
        public string menuType { get; set; } = string.Empty;

        [Display(Name = "Menu Ids")]
        public string? menuIds { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int cre_by { get; set; }

    }

}
