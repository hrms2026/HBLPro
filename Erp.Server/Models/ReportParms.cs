using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class ReportParms
    {
        public string? rp_report_type { get; set; } = string.Empty;
        public string? rp_date_range { get; set; } = string.Empty;
        public int? rp_user { get; set; }

        public int? rp_company_id { get; set; }

    }

}
