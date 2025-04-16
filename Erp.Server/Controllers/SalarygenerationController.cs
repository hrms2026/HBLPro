using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalarygenerationController : ControllerBase
    {
        private readonly ILogger<Salarygeneration> logger;
        private readonly ISalarygeneration isalarygenerations;
    
        public SalarygenerationController(ILogger<Salarygeneration> _logger, ISalarygeneration _isalarygenerations)
        {
            logger = _logger;
            isalarygenerations = _isalarygenerations;
         
        }
           
        [HttpPost("getSalarygenerations")]
       // [Authorize]
        public List<Salarygeneration> getSalarygenerations()
        {

            List<Salarygeneration> salarygenerations = new List<Salarygeneration>();
            salarygenerations = isalarygenerations.getSalarygenerations();
            return salarygenerations;
        }


        [HttpPost("getSalarygeneration")]
     //   [Authorize]
        public Salarygeneration getSalarygeneration([FromBody] int id)
        {
            Salarygeneration salarygeneration = new Salarygeneration();
            salarygeneration = isalarygenerations.getSalarygeneration(id);
            return salarygeneration;
        }

        [HttpPost("deleteSalarygeneration")]
     //   [Authorize]
        public DbResult deleteSalarygeneration([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = isalarygenerations.deleteSalarygeneration(id);
            return dbResult;
        }

        [HttpPost("generateSalary")]
      //  [Authorize]
        public DbResult generateSalary([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = isalarygenerations.generateSalary(id);
            return dbResult;
        }
    }
}
