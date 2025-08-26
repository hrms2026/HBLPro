using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Department
    {
        [Key]
        [Display(Name = "Id")]
        public int d_id { get; set; }

        [Display(Name = "Name")]
        public string? d_name { get; set; } = string.Empty;

        [Display(Name = " short Name")]
        public string? d_sname { get; set; } = string.Empty;

        [Display(Name = "department code")]
        public string? d_code { get; set; } = string.Empty;


        [Display(Name = "Created By")]
        public int? d_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? d_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime d_cre_date { get; set; } = DateTime.Now;
    }



}
