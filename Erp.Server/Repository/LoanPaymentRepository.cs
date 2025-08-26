using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Erp.Server.Repository
{
    public class LoanPaymentRepository : ILoanPayment
    {
        private DBContext db;
        public LoanPaymentRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult CreateOrUpdateLoanPayment(LoanPayment loanpayment)
        {

            var lh_id = new SqlParameter("lh_id", loanpayment.lh_id );
            var lh_loan_id = new SqlParameter("lh_loan_id", loanpayment.lh_loan_id);
            var lh_amount = new SqlParameter("lh_amount", loanpayment.lh_amount);
            var lh_remark = new SqlParameter("lh_remark", loanpayment.lh_remark + "");
            var lh_cre_by = new SqlParameter("lh_cre_by",loanpayment.lh_cre_by);

          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.CreateOrUpdateLoanPayment @lh_id,@lh_loan_id,@lh_amount,@lh_remark,@lh_cre_by;",
              lh_id, lh_loan_id, lh_amount,lh_remark,lh_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            Trace.Write(dbresult.message);
            return dbresult;
        }

        public DbResult deleteLoanPayment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteLoanPayment @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public LoanPayment getLoanPayment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var LoanPayment = db.Set<LoanPayment>().FromSqlRaw("EXEC dbo.getLoanPayment @id;", _id).ToList().FirstOrDefault() ?? new LoanPayment();
            return LoanPayment;
        }


        public List<LoanPayment> getPaymentHistory( int l_id)
        {
            var _l_id = new SqlParameter("l_id", l_id + "");
            var LoanPayments = db.Set<LoanPayment>().FromSqlRaw("EXEC dbo.getPaymentHistory @l_id", _l_id).ToList();
            return LoanPayments;

        }
        public List<LoanPayment> getLoanPayments()
        {
            var LoanPayments = db.Set<LoanPayment>().FromSqlRaw("EXEC dbo.getLoanPayments;").ToList();
            return LoanPayments;
        } 

       
    }
}
