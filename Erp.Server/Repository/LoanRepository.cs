using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class LoanRepository : ILoan
    {
        private DBContext db;
        public LoanRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateLoan(Loan loan)
        {


            var l_id = new SqlParameter("l_id", loan.l_id + "");
            var l_user = new SqlParameter("l_user",loan.l_user + "");
            var l_company_id = new SqlParameter("l_company_id",loan.l_company_id + "");
            var l_amount = new SqlParameter("l_amount",loan.l_amount + "");
            var l_reason = new SqlParameter("l_reason", loan.l_reason + "");
            var l_type = new SqlParameter("l_type", loan.l_type + "");
            var l_cutting_amount = new SqlParameter("l_cutting_amount", loan.l_cutting_amount + "");
            var l_issue_date = new SqlParameter("l_issue_date",loan.l_issue_date.ToString("yyyy-MM-dd") + "");
            var l_cre_by = new SqlParameter("l_cre_by",loan.l_cre_by + "");

          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateLoan @l_id,@l_user,@l_company_id,@l_amount,@l_reason,@l_type,@l_cutting_amount,@l_issue_date,@l_cre_by;",
              l_id,l_user,l_company_id,l_amount,l_reason,l_type,l_cutting_amount,l_issue_date,l_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteLoan(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteLoan @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Loan getLoan(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var Loan = db.Set<Loan>().FromSqlRaw("EXEC dbo.getLoan @id;", _id).ToList().FirstOrDefault() ?? new Loan();
            return Loan;
        }

        public List<Loan> getLoans()
        {
            var Loans = db.Set<Loan>().FromSqlRaw("EXEC dbo.getLoans;").ToList();
            return Loans;
        } 

       
    }
}
