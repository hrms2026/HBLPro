using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IIncome
    {
        DbResult createOrUpdateIncome(Income income);
        DbResult deleteIncome(int id);
        Income getIncome(int id);
        List<Income> getIncomes();
    }

}
