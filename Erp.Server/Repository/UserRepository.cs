using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Net;


namespace Erp.Server.Repository
{
    public class UserRepository : IUser
    {
        private DBContext db;
        public UserRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateUser(User user)
        {
            var u_id = new SqlParameter("u_id", user.u_id + "");
            var u_name = new SqlParameter("u_name", user.u_name + "");
            var u_username = new SqlParameter("u_username", user.u_username + "");
            var u_password = new SqlParameter("u_password", user.u_password + "");
            var u_mother_name = new SqlParameter("u_mother_name", user.u_mother_name + "");
            var u_father_name = new SqlParameter("u_father_name", user.u_father_name + "");
            var u_contact_person = new SqlParameter("u_contact_person", user.u_contact_person + "");
            var u_nationality = new SqlParameter("u_nationality", user.u_nationality + "");
            var u_date_of_birth = new SqlParameter("u_date_of_birth", user.u_date_of_birth );
            var u_gender = new SqlParameter("u_gender", user.u_gender + "");
            var u_emp_code = new SqlParameter("u_emp_code", user.u_emp_code + "");
            var u_date_of_join = new SqlParameter("u_date_of_join", user.u_date_of_join );
            var u_contact_email = new SqlParameter("u_contact_email", user.u_contact_email + "");
            var u_contact_mobile = new SqlParameter("u_contact_mobile", user.u_contact_mobile + "");
            var u_contact_home = new SqlParameter("u_contact_home", user.u_contact_home + "");
            var u_contact_office = new SqlParameter("u_contact_office", user.u_contact_office + "");
            var u_contact_address = new SqlParameter("u_contact_address", user.u_contact_address + "");
            var u_contact_sim_required = new SqlParameter("u_contact_sim_required", user.u_contact_sim_required + "");
            var u_marital_status = new SqlParameter("u_marital_status", user.u_marital_status + "");
            var u_religion = new SqlParameter("u_religion", user.u_religion + "");
            var u_qualification = new SqlParameter("u_qualification", user.u_qualification + "");
            var u_specialized_in = new SqlParameter("u_specialized_in", user.u_specialized_in + "");
            var u_is_admin = new SqlParameter("u_is_admin", user.u_is_admin + "");
            var u_active_yn = new SqlParameter("u_active_yn", user.u_active_yn + "");
            var u_role_id = new SqlParameter("u_role_id", user.u_role_id + "");
            var u_cre_by = new SqlParameter("u_cre_by", user.u_cre_by + "");
            var u_visa_from = new SqlParameter("u_visa_from", user.u_visa_from + "");
            var u_file_no = new SqlParameter("u_file_no", user.u_file_no + "");
            var u_visa_uid = new SqlParameter("u_visa_uid", user.u_visa_uid + "");
            var u_visa_issue_date = new SqlParameter("u_visa_issue_date", user.u_visa_issue_date );
            var u_visa_expiry_date = new SqlParameter("u_visa_expiry_date", user.u_visa_expiry_date );
            var u_labour_id = new SqlParameter("u_labour_id", user.u_labour_id + "");
            var u_labour_issue_date = new SqlParameter("u_labour_issue_date", user.u_labour_issue_date );
            var u_labour_expiry_date = new SqlParameter("u_labour_expiry_date", user.u_labour_expiry_date );
            var u_emid = new SqlParameter("u_emid", user.u_emid );
            var u_emid_issue_date = new SqlParameter("u_emid_issue_date", user.u_emid_issue_date );
            var u_emid_expiry_date = new SqlParameter("u_emid_expiry_date", user.u_emid_expiry_date );
            var u_passport_no = new SqlParameter("u_passport_no", user.u_passport_no + "");
            var u_passport_issue_date= new SqlParameter("u_passport_issue_date", user.u_passport_issue_date );
            var u_passport_expiry_date = new SqlParameter("u_passport_expiry_date", user.u_passport_expiry_date);
            var u_personal_id = new SqlParameter("u_personal_id", user.u_personal_id + "");
            var u_payment_method = new SqlParameter("u_payment_method", user.u_payment_method + "");
            var u_account_no = new SqlParameter("u_account_no", user.u_account_no + "");
            var u_uae_exchange_branch = new SqlParameter("u_uae_exchange_branch", user.u_uae_exchange_branch + "");
            var u_basic_salary = new SqlParameter("u_basic_salary", user.u_basic_salary + "");
            var u_allowance = new SqlParameter("u_allowance", user.u_allowance + "");
            var u_over_time = new SqlParameter("u_over_time", user.u_over_time + "");
            var u_present_salary = new SqlParameter("u_present_salary", user.u_present_salary + "");
            var u_benefits_after = new SqlParameter("u_benefits_after", user.u_benefits_after + "");
            var u_c_id = new SqlParameter("u_c_id", user.u_c_id + "");
            var u_ds_id = new SqlParameter("u_ds_id", user.u_ds_id + "");




            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateUser @u_id,@u_name,@u_username,@u_password,@u_mother_name,@u_father_name,@u_contact_person,@u_nationality,@u_date_of_birth,@u_gender," +
                "@u_emp_code,@u_date_of_join,@u_contact_email,@u_contact_mobile,@u_contact_home,@u_contact_office,@u_contact_address,@u_contact_sim_required," +
                "@u_marital_status,@u_religion,@u_qualification,@u_specialized_in,@u_is_admin,@u_active_yn,@u_role_id,@u_cre_by,@u_visa_from," +
                "@u_file_no,@u_visa_uid,@u_visa_issue_date,@u_visa_expiry_date,@u_labour_id,@u_labour_issue_date,@u_labour_expiry_date,@u_emid,@u_emid_issue_date,@u_emid_expiry_date," +
                "@u_passport_no,@u_passport_issue_date,@u_passport_expiry_date,@u_personal_id,@u_payment_method,@u_account_no,@u_uae_exchange_branch," +
                "@u_basic_salary,@u_allowance,@u_Over_time,@u_present_salary,@u_benefits_after,@u_c_id,@u_ds_id;",
                u_id,u_name, u_username,u_password,u_mother_name,u_father_name,u_contact_person,u_nationality,
                u_date_of_birth,u_gender,u_emp_code,u_date_of_join, u_contact_email,u_contact_mobile, u_contact_home,
                u_contact_office, u_contact_address, u_contact_sim_required, u_marital_status,u_religion,u_qualification,u_specialized_in,
                u_is_admin, u_active_yn, u_role_id,u_cre_by,u_visa_from, u_file_no, u_visa_uid, u_visa_issue_date, 
                u_visa_expiry_date,u_labour_id,u_labour_issue_date,u_labour_expiry_date,u_emid,u_emid_issue_date,u_emid_expiry_date,u_passport_no,u_passport_issue_date, u_passport_expiry_date,
                u_personal_id,u_payment_method,u_account_no, u_uae_exchange_branch,u_basic_salary,u_allowance,u_over_time,
                u_present_salary,u_benefits_after,u_c_id,u_ds_id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteUser(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteUser @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public User getUser(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var user = db.Set<User>().FromSqlRaw("EXEC dbo.getUser @id;", _id).ToList().FirstOrDefault() ?? new User();
            return user;
        }

        public User getUserByUsername(string username)
        {
            var _username = new SqlParameter("username", username + "");
            var user = db.Set<User>().FromSqlRaw("EXEC dbo.getUserByUsername @username;", _username).ToList().FirstOrDefault() ?? new User();
            return user;
        }

        public IEnumerable<User> getUsers()
        {
            var users = db.Set<User>().FromSqlRaw("EXEC dbo.getUsers;").ToList();
            return users;
        }
    }
}
