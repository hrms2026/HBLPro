using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class RoleRepository : IRole
    {
        private DBContext db;
        public RoleRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateRole(Role role)
        {
            var r_id = new SqlParameter("r_id", role.r_id + "");
            var r_name = new SqlParameter("r_name", role.r_name + "");
            var r_active_yn = new SqlParameter("r_active_yn", role.r_active_yn + "");
            var r_cre_by = new SqlParameter("r_cre_by", role.r_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateRole @r_id,@r_name,@r_active_yn,@r_cre_by;",
                r_id, r_name, r_active_yn, r_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteRole(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteRole @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Role getRole(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var role = db.Set<Role>().FromSqlRaw("EXEC dbo.getRole @id;", _id).ToList().FirstOrDefault() ?? new Role();
            return role;
        }

        public IEnumerable<Role> getRoles()
        {
            var roles = db.Set<Role>().FromSqlRaw("EXEC dbo.getRoles;").ToList();
            return roles;
        }
    }
}
