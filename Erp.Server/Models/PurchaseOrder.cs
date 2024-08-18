using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class PurchaseOrder
    { 
    
        [Key]
        [Display(Name = "Id")]
        public int po_id { get; set; }

        [Display(Name = "Make")]
        public int? po_make { get; set; }

        [Display(Name = "Model")]
        public int? po_model { get; set; }

        [Display(Name = "Processor")]
        public int? po_processor { get; set; }

        [Display(Name = "Hard Disk")]
        public int? po_harddisk { get; set; }

        [Display(Name = "Ram")]
        public int? po_ram { get; set; }

        [Display(Name = "Created By")]
        public int? po_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? po_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  po_cre_date { get; set; } = DateTime.Now;

    }
}
