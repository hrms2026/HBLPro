using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class HolidayScheduleRepository : IHolidaySchedule
    {
        private DBContext db;
        public HolidayScheduleRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateHolidaySchedule(HolidaySchedule holidaySchedule)
        {


            var hs_id = new SqlParameter("hs_id", holidaySchedule.hs_id + "");
            var hs_company_id = new SqlParameter("hs_company_id", holidaySchedule.hs_company_id + "");
            var hs_reason = new SqlParameter("hs_reason", holidaySchedule.hs_reason + "");
            var hs_leave_from = new SqlParameter("hs_leave_from", holidaySchedule.hs_leave_from.ToString("yyyy-MM-dd") + "");
            var hs_leave_to = new SqlParameter("hs_leave_to", holidaySchedule.hs_leave_to.ToString("yyyy-MM-dd") + "");
            var hs_cre_by = new SqlParameter("hs_cre_by", holidaySchedule.hs_cre_by + "");

          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateHolidaySchedule @hs_id,@hs_company_id,@hs_reason,@hs_leave_from,@hs_leave_to,@hs_cre_by;",
              hs_id,hs_company_id,hs_reason,hs_leave_from,hs_leave_to,hs_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteHolidaySchedule(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteHolidaySchedule @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public HolidaySchedule getHolidaySchedule(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var HolidaySchedule = db.Set<HolidaySchedule>().FromSqlRaw("EXEC dbo.getHolidaySchedule @id;", _id).ToList().FirstOrDefault() ?? new HolidaySchedule();
            return HolidaySchedule;
        }

        public List<HolidaySchedule> getHolidaySchedules()
        {
            var HolidaySchedules = db.Set<HolidaySchedule>().FromSqlRaw("EXEC dbo.getHolidaySchedules;").ToList();
            return HolidaySchedules;
        } 

       
    }
}
