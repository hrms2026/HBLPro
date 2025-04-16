using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayScheduleController : ControllerBase
    {
        private readonly ILogger<HolidaySchedule> logger;
        private readonly IHolidaySchedule iHolidaySchedule;
    
        public HolidayScheduleController(ILogger<HolidaySchedule> _logger,IHolidaySchedule _iHolidaySchedule)
        {
            logger = _logger;
            iHolidaySchedule = _iHolidaySchedule;
         
        }
           
        [HttpPost("getHolidaySchedules")]
        //[Authorize]
        public List<HolidaySchedule> getHolidaySchedules()
        {

            List<HolidaySchedule> holidaySchedule = new List<HolidaySchedule>();
            holidaySchedule = iHolidaySchedule.getHolidaySchedules();
            return holidaySchedule;
        }


        [HttpPost("getHolidaySchedule")]
       // [Authorize]
        public HolidaySchedule getHolidaySchedule([FromBody] int id)
        {
            HolidaySchedule holidaySchedule= new HolidaySchedule();
           holidaySchedule = iHolidaySchedule.getHolidaySchedule(id);
            return holidaySchedule;
        }

        [HttpPost("deleteHolidaySchedule")]
        //[Authorize]
        public DbResult deleteHolidaySchedule([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iHolidaySchedule.deleteHolidaySchedule(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateHolidaySchedule")]
       // [Authorize]
        public DbResult createOrUpdateHolidaySchedule([FromBody] HolidaySchedule holidaySchedule)
        {
            Trace.WriteLine("Datetime  " +holidaySchedule.hs_leave_from+"  "+holidaySchedule.hs_leave_to);
            DbResult dbResult = new DbResult();
            dbResult = iHolidaySchedule.createOrUpdateHolidaySchedule(holidaySchedule);
            return dbResult;
        }
    }
}
