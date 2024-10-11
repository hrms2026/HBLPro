using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class SupplierRepository : ISupplier
    {
        private DBContext db;
        public SupplierRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateSupplier(Supplier supplier)
        {
            var s_id = new SqlParameter("s_id", supplier.s_id + "");
            var s_name = new SqlParameter("s_name", supplier.s_name + "");
            var s_active_yn = new SqlParameter("s_active_yn", supplier.s_active_yn + "");
            var s_cre_by = new SqlParameter("s_cre_by", supplier.s_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateSupplier @s_id,@s_name,@s_active_yn,@s_cre_by;",
                s_id, s_name, s_active_yn, s_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteSupplier(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteSupplier @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Supplier getSupplier(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var supplier = db.Set<Supplier>().FromSqlRaw("EXEC dbo.getSupplier @id;", _id).ToList().FirstOrDefault() ?? new Supplier();
            return supplier;
        }

        public IEnumerable<Supplier> getSuppliers()
        {
            var suppliers = db.Set<Supplier>().FromSqlRaw("EXEC dbo.getSuppliers;").ToList();
            return suppliers;
        }
    }
}
