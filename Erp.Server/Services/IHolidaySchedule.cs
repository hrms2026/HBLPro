using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IHolidaySchedule
    {
        public List<HolidaySchedule> getHolidaySchedules();
        HolidaySchedule getHolidaySchedule(int id);
        DbResult deleteHolidaySchedule(int id);
        DbResult createOrUpdateHolidaySchedule(HolidaySchedule holidaySchedule);
    }
}
