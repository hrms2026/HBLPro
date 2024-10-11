using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IExpense
    {
        DbResult createOrUpdateExpense(Expense expense);
        DbResult deleteExpense(int id);
        Expense getExpense(int id);
        public List<Expense> getExpenses();
    }
}
