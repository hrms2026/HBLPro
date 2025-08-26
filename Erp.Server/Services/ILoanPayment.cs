using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ILoanPayment
    {
        public List<LoanPayment> getLoanPayments();
        LoanPayment getLoanPayment(int id);

        public List<LoanPayment> getPaymentHistory(int l_id);

        DbResult deleteLoanPayment(int id);

        DbResult CreateOrUpdateLoanPayment(LoanPayment loanpayment);
       


    }
}
