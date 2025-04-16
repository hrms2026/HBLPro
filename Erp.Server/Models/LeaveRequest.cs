using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Erp.Server.Models
{
    public class LeaveRequest
    {
        [Key]
        [Display(Name = "id")]
        public int? lr_id { get; set; } = 0;

        [Display(Name = "leave for")]
        public int? lr_user { get; set; } = 0;

        [Display(Name = "leave for")]
        public string? lr_user_name { get; set; } = string.Empty;

        [Display(Name = "Department")]
        public int? lr_department { get; set; } = 0;

        [Display(Name = "Department name")]
        public string? lr_department_name { get; set; } = string.Empty;


        [Display(Name = "Designation")]
        public int? lr_designation { get; set; } = 0;

        [Display(Name = "Designation name")]
        public string? lr_designation_name { get; set; } = string.Empty;


        [Display(Name = "leave Type")]
        public int? lr_leave_type { get; set; } = 0;

        [Display(Name = "leave Type")]
        public string? lr_leave_type_name { get; set; } = string.Empty;


        [Display(Name = "leave from")]
        public DateTime? lr_leave_from { get; set; } = DateTime.Now;


        [Display(Name = "leave To")]
        public DateTime? lr_leave_to { get; set; } = DateTime.Now;


        [Display(Name = "leave days")]
        public int? lr_leave_days { get; set; } = 0;


        [Display(Name = "Contact Number1")]
        public string? lr_contact_details { get; set; } = string.Empty;

        [Display(Name = "Contact Number2 ")]
        public string? lr_phone { get; set; } = string.Empty;

        [Display(Name = "Address")]
        public string? lr_address { get; set; } = string.Empty;

        [Display(Name = "Remarks")]
        public string? lr_reason { get; set; } = string.Empty;

        [Display(Name = "Status")]
        public int? lr_status { get; set; } = 0;


        [Display(Name = "created by")]
        public int? lr_cre_by { get; set; } = 0;

        [Display(Name = "created by")]
        public string? lr_cre_by_name { get; set; } = string.Empty;


        [Display(Name = "Created On")]
        [DataType(DataType.DateTime)]
        public DateTime? lr_cre_date { get; set; } = DateTime.Now;

    }



}
