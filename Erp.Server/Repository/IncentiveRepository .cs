using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class IncentiveRepository : IIncentive
    {
        private DBContext db;
        public IncentiveRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateIncentive(Incentive incentive)
        {
            var i_id = new SqlParameter("i_id", incentive.i_id + "");
            var i_user = new SqlParameter("i_user",incentive.i_user + "");
            var i_month = new SqlParameter("i_month", incentive.i_month);
            var i_amount = new SqlParameter("i_amount", incentive.i_amount + "");
            var i_payment_type = new SqlParameter("i_payment_type",incentive.i_payment_type + "");
            var i_reason = new SqlParameter("i_reason", incentive.i_reason + "");
            var i_cre_by = new SqlParameter("i_cre_by", incentive.i_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateIncentive @i_id,@i_user,@i_month,@i_amount,@i_payment_type,@i_reason,@i_cre_by;",
                i_id,i_user,i_month,i_amount,i_payment_type,i_reason,i_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteIncentive(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteIncentive @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Incentive getIncentive(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var incentive = db.Set<Incentive>().FromSqlRaw("EXEC dbo.getIncentive @id;", _id).ToList().FirstOrDefault() ?? new Incentive();
            return incentive;

        }

        public List<Incentive> getIncentives(RequestParams requestParams)
        {
            var _month = new SqlParameter("i_month",requestParams.month);
            var incentives = db.Set<Incentive>().FromSqlRaw("EXEC dbo.getIncentives @i_month;", _month).ToList();
            return incentives;
        } 

       
    }
}

