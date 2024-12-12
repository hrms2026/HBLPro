using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly ILogger<Designation> logger;
        private readonly IDesignation idesignations;
    
        public DesignationController(ILogger<Designation> _logger,IDesignation _idesignations)
        {
            logger = _logger;
            idesignations = _idesignations;
         
        }
           
        [HttpPost("getDesignations")]
        //[Authorize]
        public List<Designation> getDesignations()
        {

            List<Designation> designations = new List<Designation>();
            designations = idesignations.getDesignations();
            return designations;
        }


        [HttpPost("getDesignation")]
       // [Authorize]
        public Designation getDesignation([FromBody] int id)
        {
            Designation designation = new Designation();
            designation = idesignations.getDesignation(id);
            return designation;
        }

        [HttpPost("deleteDesignation")]
        //[Authorize]
        public DbResult deleteDesignation([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = idesignations.deleteDesignation(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateDesignation")]
       // [Authorize]
        public DbResult createOrUpdateDesignation([FromBody] Designation designation)
        {
            DbResult dbResult = new DbResult();
            dbResult = idesignations.createOrUpdateDesignation(designation);
            return dbResult;
        }
    }
}
