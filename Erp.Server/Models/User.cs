using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class User { 
    
        [Key]
        [Display(Name = "Id")]
        public int u_id { get; set; }

        [Display(Name = "Full Name")]
        public string? u_name { get; set; } = string.Empty;

        [Display(Name = "Username")]
        public string? u_username { get; set; } = string.Empty;

        [Display(Name = "Password")]
        public string? u_password { get; set; } = string.Empty;


        [Display(Name = "mother name")]
        public string? u_mother_name { get; set; } = string.Empty;

        [Display(Name = "father name")]
        public string? u_father_name { get; set; } = string.Empty;


        [Display(Name = "contact person")]
        public string? u_contact_person { get; set; } = string.Empty;

        [Display(Name = "nationality")]
        public int? u_nationality { get; set; } = 0;

        [Display(Name = "nationality")]
        public string? u_nationality_name { get; set; } = string.Empty;

        [Display(Name = "date of birth")]
        public DateTime? u_date_of_birth { get; set; }

        [Display(Name = "Gender")]
        public int? u_gender { get; set; } = 0;

        [Display(Name = "Gender")]
        public string? u_gender_name { get; set; } = string.Empty;

        [Display(Name = "EMP Code")]
        public string? u_emp_code { get; set; } = string.Empty;


        [Display(Name = "date of join")]
        public DateTime? u_date_of_join { get; set; }

        [Display(Name = "Email")]
        public string? u_contact_email { get; set; } = string.Empty;

        [Display(Name = "mobile")]
        public string? u_contact_mobile { get; set; } = string.Empty;

        [Display(Name = "home")]
        public string? u_contact_home { get; set; } = string.Empty;

        [Display(Name = "office")]
        public string? u_contact_office { get; set; } = string.Empty;

        [Display(Name = "Address")]
        public string? u_contact_address{ get; set; } = string.Empty;

        [Display(Name = "sim")]
        public string? u_contact_sim_required { get; set; } = string.Empty;

        [Display(Name = "marital status")]
        public int? u_marital_status { get; set; } = 0;

        [Display(Name = "marital status")]
        public string? u_marital_status_name { get; set; } = string.Empty;


        [Display(Name = "religion")]
        public int? u_religion { get; set; } = 0;

        [Display(Name = "religion")]
        public string? u_religion_name { get; set; } = string.Empty;

        [Display(Name = "qualification")]
        public int? u_qualification { get; set; } = 0;

        [Display(Name = "qualification")]
        public string? u_qualification_name { get; set; } = string.Empty;

        [Display(Name = "specialized in")]
        public string? u_specialized_in { get; set; } = string.Empty;


        [Display(Name = "is Admin")]
        public string? u_is_admin { get; set; } = "N";

        [Display(Name = "Active")]
        public string? u_active_yn { get; set; } = "Y";

        [Display(Name = "Role Id")]
        public int? u_role_id { get; set; }

        [Display(Name = "Role Id")]
        public string? u_role_name { get; set; } = string.Empty;

     
        [Display(Name = "Created By")]
        public int? u_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? u_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  u_cre_date { get; set; } = DateTime.Now;

        [Display(Name = "visa from")]
        public string? u_visa_from { get; set; } = string.Empty;


        [Display(Name = "file no")]
        public string? u_file_no { get; set; } = string.Empty;
        [Display(Name = "visa uid")]
        public string? u_visa_uid { get; set; } = string.Empty;


        [Display(Name = "visa issue date")]
        [DataType(DataType.Date)]
        public DateTime  u_visa_issue_date { get; set; } = DateTime.Now;

        [Display(Name = "visa expiry date")]
        public DateTime u_visa_expiry_date { get; set; } = DateTime.Now;

        [Display(Name = "labour id")]
        public string? u_labour_id { get; set; } = string.Empty;

        [Display(Name = "labour issue date")]
        public DateTime u_labour_issue_date { get; set; } = DateTime.Now;

        [Display(Name = "labour expiry date")]
        public DateTime u_labour_expiry_date { get; set; } = DateTime.Now;

        [Display(Name = " emid")]
        public string? u_emid { get; set; }

        [Display(Name = "emid issue date")]
        [DataType(DataType.Date)]
        public DateTime u_emid_issue_date { get; set; } = DateTime.Now;

        [Display(Name = "emid expiry  date")]
        [DataType(DataType.Date)]
        public DateTime u_emid_expiry_date { get; set; } = DateTime.Now;

        [Display(Name = "passport no")]
        public string? u_passport_no { get; set; } = string.Empty;

        [Display(Name = "passport issue date")]
        [DataType(DataType.Date)]
        public DateTime u_passport_issue_date { get; set; } = DateTime.Now;

        [Display(Name = "passport expiry  date")]
        [DataType(DataType.Date)]
        public DateTime u_passport_expiry_date { get; set; } = DateTime.Now;


        [Display(Name = "personal id")]
        public string? u_personal_id { get; set; } = string.Empty;

        [Display(Name = "payment method")]
        public int? u_payment_method { get; set; } = 0;

        [Display(Name = "payment method")]
        public string? u_payment_method_name { get; set; } = string.Empty;

        [Display(Name = "account no")]
        public string? u_account_no { get; set; } = string.Empty;

        [Display(Name = "exchange")]
        public int? u_uae_exchange_branch { get; set; } = 0;

        [Display(Name = "exchange")]
        public string? u_uae_exchange_branch_name { get; set; } = string.Empty;


        [Display(Name = "basic salary")]
        public int? u_basic_salary { get; set; } 

        [Display(Name = "allowance")]
        public int? u_allowance { get; set; }

        [Display(Name = "over time")]
        public int? u_over_time { get; set; }

        [Display(Name = "present salary")]
        public int? u_present_salary { get; set; }

        [Display(Name = "benefits after")]
        public int? u_benefits_after { get; set; } = 0;

        [Display(Name = "benefits after")]
        public string? u_benefits_after_name { get; set; } = string.Empty;

        [Display(Name = "company")]
        public int? u_c_id { get; set; } = 0;

        [Display(Name = "company")]
        public string? u_c_name { get; set; } = string.Empty;

        [Display(Name = "Designation")]
        public int? u_ds_id { get; set; } = 0;

        [Display(Name = "Designation")]
        public string? u_ds_name { get; set; } = string.Empty;


    }
}
