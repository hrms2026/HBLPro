using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Company
    {
        [Key]

        [Display(Name = "Id")]
        public int? c_id { get; set; } = 0;

        [Display(Name = "type")]
        public string? c_type { get; set; } = string.Empty;

        [Display(Name = "name")]
        public string? c_name { get; set; } = string.Empty;

        [Display(Name = "sname")]
        public string? c_sname { get; set; } = string.Empty;

        [Display(Name = "country")]
        public string? c_country { get; set; } = string.Empty;

        [Display(Name = "address")]
        public string? c_address { get; set; } = string.Empty;

        [Display(Name = "Post Box")]
        public string? c_post_box { get; set; } = string.Empty;

        [Display(Name = "phone")]
        public string c_phone { get; set; } = string.Empty;

        [Display(Name = "fax")]
        public string? c_fax { get; set; } = string.Empty;

        [Display(Name = "mail")]
        public string? c_mail { get; set; } = string.Empty;

        [Display(Name = "website")]
        public string? c_website { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int? c_cre_by { get; set; } = 0;

        [Display(Name = "Created By")]
        public string? c_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime? c_cre_date { get; set; } = DateTime.Now;
    }



}
