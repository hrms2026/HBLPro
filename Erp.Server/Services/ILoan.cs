using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ILoan
    {
        public List<Loan> getLoans();
        Loan getLoan(int id);
        DbResult deleteLoan(int id);
        DbResult createOrUpdateLoan(Loan loan);
       


    }
}
