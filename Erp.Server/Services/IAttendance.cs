using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IAttendance
    {
        DbResult CreateOrUpdateAttandance(Attendance attendance);
       
        DbResult deleteAttendance(int id);
        Attendance getAttendance(int id);
        List<Attendance> getAttendances(RequestParams requestParams);

        DbResult punchAttendance(int id);
    }
}
