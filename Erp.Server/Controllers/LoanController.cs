using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly ILogger<Loan> logger;
        private readonly ILoan iloans;
    
        public LoanController(ILogger<Loan>_logger,ILoan _iloans)
        {
            logger = _logger;
            iloans = _iloans;
         
        }
           
        [HttpPost("getLoans")]
        //[Authorize]
        public List<Loan> getLoans()
        {

            List<Loan> loan = new List<Loan>();
            loan = iloans.getLoans();
            return loan;
        }


        [HttpPost("getLoan")]
       // [Authorize]
        public Loan getLoan([FromBody] int id)
        {
            Loan loan= new Loan();
           loan = iloans.getLoan(id);
            return loan;
        }

        [HttpPost("deleteLoan")]
        //[Authorize]
        public DbResult deleteLoan([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iloans.deleteLoan(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateLoan")]
       // [Authorize]
        public DbResult createOrUpdateLoan([FromBody] Loan loan)
        {
            DbResult dbResult = new DbResult();
            dbResult = iloans.createOrUpdateLoan(loan);
            return dbResult;
        }

        




    }
}
