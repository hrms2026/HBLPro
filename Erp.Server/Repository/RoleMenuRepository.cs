using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class RoleMenuRepository : IRoleMenu
    {
        private DBContext db;
        public RoleMenuRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateRoleMenu(MenuAllocation menuAllocation)
        {
            var _role = new SqlParameter("role", menuAllocation.role + "");
            var _menuType = new SqlParameter("menuType", menuAllocation.menuType + "");
            var _menuIds = new SqlParameter("menuIds", menuAllocation.menuIds + "");
            var _cre_by = new SqlParameter("cre_by", menuAllocation.cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateRoleMenu @role,@menuType,@menuIds,@cre_by;",
                _role, _menuType, _menuIds, _cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

    }
}
