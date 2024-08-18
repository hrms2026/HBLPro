using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class MenuWrapper
    {
        [Key]
        [Display(Name = "Id")]
        public int m_id { get; set; }

        [Display(Name = "Name")]
        public string? m_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string? m_link { get; set; } = string.Empty;

        [Display(Name = "Icon")]
        public string? m_fa_icon { get; set; } = string.Empty;

        [Display(Name = "Parrent")]
        public int? m_parrent { get; set; }

        [Display(Name = "Parrent")]
        public string? m_parrent_name { get; set; }

        [Display(Name = "Type")]
        public string? m_type { get; set; } =string.Empty;

        [Display(Name = "Created By")]
        public int? m_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? m_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime m_cre_date { get; set; } = DateTime.Now;

        public List<Menu> m_menu_items { get; set; } =new List<Menu>();
    }



}
