using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IIncentive
    {
        public List<Incentive> getIncentives(RequestParams requestParams);
        Incentive getIncentive(int id);
        DbResult deleteIncentive(int id);
        DbResult createOrUpdateIncentive(Incentive incentive);
    }
}
