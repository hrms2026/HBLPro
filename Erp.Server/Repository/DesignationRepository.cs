using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class DesignationRepository : IDesignation
    {
        private DBContext db;
        public DesignationRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateDesignation(Designation designation)
        {
            var ds_id = new SqlParameter("ds_id", designation.ds_id + "");
            var ds_name = new SqlParameter("ds_name", designation.ds_name + "");
            var ds_cre_by = new SqlParameter("ds_cre_by", designation.ds_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateDesignation @ds_id,@ds_name,@ds_cre_by;",
                ds_id, ds_name,  ds_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteDesignation(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteDesignation @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Designation getDesignation(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var designation = db.Set<Designation>().FromSqlRaw("EXEC dbo.getDesignation @id;", _id).ToList().FirstOrDefault() ?? new Designation();
            return designation;
        }

        public List<Designation> getDesignations()
        {
            var designations = db.Set<Designation>().FromSqlRaw("EXEC dbo.getDesignations;").ToList();
            return designations;
        } 

       
    }
}
