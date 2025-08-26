using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    
    class DepartmentRepository : IDepartment
    {
        private DBContext db;
        public DepartmentRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateDepartment(Department department)
        {
            var d_id = new SqlParameter("d_id", department.d_id + "");
            var d_name = new SqlParameter("d_name", department.d_name + "");
            var d_sname = new SqlParameter("d_sname", department.d_sname + "");
            var d_code = new SqlParameter("d_code", department.d_code + "");
            var d_cre_by = new SqlParameter("d_cre_by", department.d_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateDepartment @d_id,@d_name,@d_sname,@d_code,@d_cre_by;",
                d_id, d_name,d_sname,d_code, d_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteDepartment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteDepartment @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Department getDepartment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var department = db.Set<Department>().FromSqlRaw("EXEC dbo.getDepartment @id;", _id).ToList().FirstOrDefault() ?? new Department();
            return department;
        }

        public List<Department> getDepartments()
        {
            var departments = db.Set<Department>().FromSqlRaw("EXEC dbo.getDepartments;").ToList();
            return departments;
        } 

       
    }
}
