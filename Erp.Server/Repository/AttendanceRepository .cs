using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class AttendanceRepository : IAttendance
    {
        private DBContext db;
        public AttendanceRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult CreateOrUpdateAttandance(Attendance attendance)
        {
            var att_id= new SqlParameter("att_id", attendance.att_id + "");
            var att_emp_id = new SqlParameter("att_emp_id", attendance.att_emp_id + "");
            var att_punch_time = new SqlParameter("att_punch_time", attendance.att_punch_time + "");
            var att_punch_type = new SqlParameter("att_punch_type", attendance.att_punch_type + "");
            var att_machine_id = new SqlParameter("att_machine_id", attendance.att_machine_id + "");
            var att_cre_date = new SqlParameter("att_cre_date", attendance.att_cre_date + "");
           
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.CreateOrUpdateAttandance @att_id,@att_emp_id, @att_punch_time,@att_punch_type,@att_machine_id,@att_cre_date;",
                att_id, att_emp_id,att_punch_time,att_punch_type,att_machine_id,att_cre_date).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteAttendance(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteAttendance @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Attendance getAttendance(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var Attendance = db.Set<Attendance>().FromSqlRaw("EXEC dbo.getAttendance @id;", _id).ToList().FirstOrDefault() ?? new Attendance();
            return Attendance;
        }

        public List<Attendance> getAttendances(RequestParams requestParams)
        {
            var _daterange = new SqlParameter("daterange", requestParams.daterange + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var attendances = db.Set<Attendance>().FromSqlRaw("EXEC dbo.getAttendances @daterange,@user;", _daterange, _user).ToList();
            return attendances;
        }

        public DbResult punchAttendance(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.punchAttendance @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }
    }
}
