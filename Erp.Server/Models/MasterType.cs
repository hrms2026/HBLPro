using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class MasterType { 
    
        [Key]
        [Display(Name = "Id")]
        public int id { get; set; }

        [Display(Name = "type")]
        public string? type { get; set; } = string.Empty;

    }
}
