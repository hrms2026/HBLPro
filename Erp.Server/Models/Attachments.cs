using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Attachments
    {
        [Key]
        [Display(Name = "Id")]
        public int a_id { get; set; }

        [Display(Name = "Name")]
        public string? a_name { get; set; } = string.Empty;

        [Display(Name = "path")]
        public string? a_path { get; set; } = string.Empty;


        [Display(Name = "Created By")]
        public int? a_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? a_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime a_cre_date { get; set; } = DateTime.Now;
    }



}
