using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class Machine
    {
        [Key]
        [Display(Name = "id")]
        public int? m_id { get; set; } = 0;

        [Display(Name = "name")]
        public string? m_name { get; set; } = string.Empty;

        [Display(Name = "port")]
        public int? m_port { get; set; } = 0;

        [Display(Name = "ip address")]
        public string? m_ip_address { get; set; } = string.Empty;


        [Display(Name = "type")]
        public string? m_type { get; set; } = string.Empty;

        [Display(Name = "created by")]
        public int? m_cre_by { get; set; } = 0;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime m_cre_date { get; set; } = DateTime.Now;

    }



}
