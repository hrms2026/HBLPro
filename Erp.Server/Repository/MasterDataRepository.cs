using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class MasterDataRepository : IMasterData
    {
        private DBContext db;
        public MasterDataRepository(DBContext _db)
        {
            db = _db;
        }

        public List<MasterData> getMasterDatas()
        {
            var masterDatas = db.Set<MasterData>().FromSqlRaw("EXEC dbo.getMasterDatas;").ToList();
            return masterDatas;
        }

        public DbResult createOrUpdateMasterData(MasterData masterdata)
        {
            var md_id = new SqlParameter("md_id", masterdata.md_id + "");
            var md_name = new SqlParameter("md_name", masterdata.md_name + "");
            var md_type = new SqlParameter("md_type", masterdata.md_type + "");
            var md_active_yn = new SqlParameter("md_active_yn", masterdata.md_active_yn + "");
            var md_cre_by = new SqlParameter("md_cre_by", masterdata.md_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateMasterData @md_id,@md_name,@md_type,@md_active_yn,@md_cre_by;",
                md_id, md_name, md_type, md_active_yn, md_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteMasterData(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteMasterData @id;", _id).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public MasterData getMasterData(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var masterdata = db.Set<MasterData>().FromSqlRaw("EXEC dbo.getMasterData @id;", _id).ToList().FirstOrDefault() ?? new MasterData();

            return masterdata;
        }

        public List<MasterData> getMasterDatasByType(RequestParams requestParams)
        {
            var type = new SqlParameter("type", requestParams.type + "");
            var masterDatas = db.Set<MasterData>().FromSqlRaw("EXEC dbo.getMasterDatasByType @type;", type).ToList();
            return masterDatas;
        }

        public List<MasterType> getMasterDataTypes()
        {
            var masterDatas = db.Set<MasterType>().FromSqlRaw("EXEC dbo.getMasterDataTypes;").ToList();
            return masterDatas;
        }
    }
}
