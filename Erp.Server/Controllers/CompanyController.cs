using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ILogger<Company> logger;
        private readonly ICompany iCompany;
    
        public CompanyController(ILogger<Company> _logger,ICompany _iCompany)
        {
            logger = _logger;
            iCompany = _iCompany;
         
        }
           
        [HttpPost("getCompanies")]
        //[Authorize]
        public List<Company> getCompanies()
        {

            List<Company> company = new List<Company>();
            company = iCompany.getCompanies();
            return company;
        }


        [HttpPost("getCompany")]
       // [Authorize]
        public Company getCompany([FromBody] int id)
        {
            Company company= new Company();
           company = iCompany.getCompany(id);
            return company;
        }

        [HttpPost("deleteCompany")]
        //[Authorize]
        public DbResult deleteCompany([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iCompany.deleteCompany(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateCompany")]
       // [Authorize]
        public DbResult createOrUpdateCompany([FromBody] Company company)
        {
            DbResult dbResult = new DbResult();
            dbResult = iCompany.createOrUpdateCompany(company);
            return dbResult;
        }
    }
}
