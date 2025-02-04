using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly ILogger<Attendance> logger;
        private readonly IAttendance iattendances;
    
        public AttendanceController(ILogger<Attendance> _logger,IAttendance _iattendances)
        {
            logger = _logger;
            iattendances = _iattendances;
         
        }
           
        [HttpPost("getAttendances")]
       // [Authorize]
        public List<Attendance> getAttendances([FromBody]RequestParams requestParams)
        {

            List<Attendance> attendances = new List<Attendance>();
            attendances = iattendances.getAttendances(requestParams);
            return attendances;
        }


        [HttpPost("getAttendance")]
     //   [Authorize]
        public Attendance getAttendance([FromBody] int id)
        {
            Attendance attendance = new Attendance();
            attendance = iattendances.getAttendance(id);
            return attendance;
        }

        [HttpPost("deleteAttendance")]
     //   [Authorize]
        public DbResult deleteAttendance([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iattendances.deleteAttendance(id);
            return dbResult;
        }

        [HttpPost("punchAttendance")]
      //  [Authorize]
        public DbResult punchAttendance([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iattendances.punchAttendance(id);
            return dbResult;
        }
    }
}
