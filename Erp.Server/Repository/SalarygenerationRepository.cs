using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class SalarygenerationRepository : ISalarygeneration
    {
        private DBContext db;
        public SalarygenerationRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult CreateOrUpdateSalarygeneration(Salarygeneration salarygeneration)
        {
            var sg_company= new SqlParameter("sg_company", salarygeneration.sg_company + "");
            var sg_year = new SqlParameter("sg_year",salarygeneration.sg_year+ "");
            var sg_employee_name= new SqlParameter("sg_employee_name", salarygeneration.sg_employee_name + "");
            var sg_personal_id = new SqlParameter("sg_personal_id",salarygeneration.sg_personal_id + "");
            var sg_employee_code = new SqlParameter("sg_employee_code",salarygeneration.sg_employee_code + "");
            var sg_acc_no = new SqlParameter("sg_acc_no",salarygeneration.sg_acc_no + "");
            var sg_present_salary = new SqlParameter("sg_present_salary", salarygeneration.sg_present_salary + "");
            var sg_attendance_remark = new SqlParameter("sg_attendance_remark", salarygeneration.sg_attendance_remark + "");
            var sg_basic_salary = new SqlParameter("sg_basic_salary", salarygeneration.sg_basic_salary + "");
            var sg_variable_salary = new SqlParameter("sg_variable_salary", salarygeneration.sg_variable_salary + "");
            var sg_cash_part = new SqlParameter("sg_cash_part", salarygeneration.sg_cash_part + "");
            var sg_total_salary = new SqlParameter("sg_total_salary", salarygeneration.sg_total_salary + "");
            var sg_due_to = new SqlParameter("sg_due_to", salarygeneration.sg_due_to + "");
            var sg_due_from = new SqlParameter("sg_due_from", salarygeneration.sg_due_from + "");
            var sg_uae_exchange_transfer = new SqlParameter("sg_uae_exchange_transfer", salarygeneration.sg_uae_exchange_transfer + "");
            var sg_variable_transfer = new SqlParameter("sg_variable_transfer", salarygeneration.sg_variable_transfer + "");
            var sg_cre_date = new SqlParameter("sg_cre_date", salarygeneration.sg_cre_date + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.CreateOrUpdateSalaryGeneration @sg_company,@sg_year,@sg_employee_name,@sg_acc_no,@sg_personal_id,@sg_employee_code,@sg_acc_no,@sg_persent_salary,@sg_attendance_remark,@sg_basic_salary," +
                "@sg_variable_salary,@sg_cash_part,@sg_total_salary,@sg_due_to,@sg_due_from,@sg_uae_exchange_transfer,@sg_variable_transfer,@sg_cre_date;",
                sg_company,sg_year,sg_employee_name,sg_personal_id,sg_employee_code,sg_acc_no,sg_present_salary,sg_attendance_remark,sg_basic_salary,sg_variable_salary,sg_cash_part,sg_total_salary,sg_due_to,sg_due_from, @sg_uae_exchange_transfer, @sg_variable_transfer, @sg_cre_date).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteSalarygeneration(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteSAlaryGeneration @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Salarygeneration getSalarygeneration(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var Salarygeneration = db.Set<Salarygeneration>().FromSqlRaw("EXEC dbo.getSalaryGeneration @id;", _id).ToList().FirstOrDefault() ?? new Salarygeneration();
            return Salarygeneration;
        }

        public List<Salarygeneration> getSalarygenerations()
        {
            var salarygenerations = db.Set<Salarygeneration>().FromSqlRaw("EXEC dbo.getSalarygenerations;").ToList();
            return salarygenerations;
        }
     
        public DbResult generateSalary(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.generateSalary @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }
    }
}
