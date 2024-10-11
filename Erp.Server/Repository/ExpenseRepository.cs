using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class ExpenseRepository : IExpense
    {
        private DBContext db;
        public ExpenseRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateExpense(Expense expense)
        {
            var e_id = new SqlParameter("e_id", expense.e_id + "");
            var e_category = new SqlParameter("e_category", expense.e_category + "");
            var e_expense_date = new SqlParameter("e_expense_date", expense.e_expense_date + "");
            var e_amount = new SqlParameter("e_amount", expense.e_amount + "");
            var e_payment_method = new SqlParameter("e_payment_method", expense.e_payment_method + "");
            var e_remarks = new SqlParameter("e_remarks", expense.e_remarks + "");
            var e_cre_by = new SqlParameter("e_cre_by", expense.e_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateExpense @e_id,@e_category,@e_expense_date,@e_amount,@e_payment_method,@e_remarks,@e_cre_by;",
                e_id, e_category, e_expense_date, e_amount, e_payment_method, e_remarks,e_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteExpense(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteExpense @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Expense getExpense(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var expense = db.Set<Expense>().FromSqlRaw("EXEC dbo.getExpense @id;", _id).ToList().FirstOrDefault() ?? new Expense();
            return expense;
        }

        public List<Expense> getExpenses()
        {
            var expenses = db.Set<Expense>().FromSqlRaw("EXEC dbo.getExpenses;").ToList();
            return expenses;
        }
    }
}
