using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Designation
    {
        [Key]
        [Display(Name = "Id")]
        public int ds_id { get; set; }

        [Display(Name = "Name")]
        public string? ds_name { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int? ds_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? ds_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime ds_cre_date { get; set; } = DateTime.Now;
    }



}
