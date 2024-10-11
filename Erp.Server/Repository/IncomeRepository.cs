using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class IncomeRepository : IIncome
    {
        private DBContext db;

        public IncomeRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateIncome(Income income)
        {
            var i_id = new SqlParameter("i_id", income.i_id);
            var i_category = new SqlParameter("i_category", income.i_category);
            var i_income_date = new SqlParameter("i_income_date", income.i_income_date);
            var i_amount = new SqlParameter("i_amount", income.i_amount);
            var i_payment_method = new SqlParameter("i_payment_method", income.i_payment_method);
            var i_remarks = new SqlParameter("i_remarks", income.i_remarks);
            var i_cre_by = new SqlParameter("i_cre_by", income.i_cre_by);

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateIncome @i_id, @i_category, @i_income_date, @i_amount, @i_payment_method, @i_remarks, @i_cre_by;",
                i_id, i_category, i_income_date, i_amount, i_payment_method, i_remarks, i_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteIncome(int id)
        {
            var _id = new SqlParameter("id", id);
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteIncome @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Income getIncome(int id)
        {
            var _id = new SqlParameter("id", id);
            var income = db.Set<Income>().FromSqlRaw("EXEC dbo.getIncome @id;", _id).ToList().FirstOrDefault() ?? new Income();
            return income;
        }

        public List<Income> getIncomes()
        {
            var incomes = db.Set<Income>().FromSqlRaw("EXEC dbo.getIncomes;").ToList();
            return incomes;
        }
    }

}
