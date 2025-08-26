using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanPaymentController : ControllerBase
    {
        private readonly ILogger<LoanPayment> logger;
        private readonly ILoanPayment iloanpayments;
    
        public LoanPaymentController(ILogger<LoanPayment>_logger,ILoanPayment _iloanpayments)
        {
            logger = _logger;
            iloanpayments = _iloanpayments;
         
        }
           
        [HttpPost("getLoanPayments")]
        //[Authorize]
        public List<LoanPayment> getLoanPayments()
        {

            List<LoanPayment> loanpayment = new List<LoanPayment>();
            loanpayment = iloanpayments.getLoanPayments();
            return loanpayment;
        }


        [HttpPost("getPaymentHistory")]
        // [Authorize]
        public List<LoanPayment> getPaymentHistory([FromBody] int l_id)
        {

            List<LoanPayment> loanpayment = new List<LoanPayment>();
            loanpayment = iloanpayments.getPaymentHistory(l_id);
            return loanpayment;
        }

        [HttpPost("deleteLoanPayment")]
        //[Authorize]
        public DbResult deleteLoanPayment([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iloanpayments.deleteLoanPayment(id);
            return dbResult;
        }

        [HttpPost("CreateOrUpdateLoanPayment")]
       // [Authorize]
        public DbResult CreateOrUpdateLoanPayment([FromBody] LoanPayment loanpayment)
        {
          
            DbResult dbResult = new DbResult();
            dbResult = iloanpayments.CreateOrUpdateLoanPayment(loanpayment);
            return dbResult;
        }

        




    }
}
