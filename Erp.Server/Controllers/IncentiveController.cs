using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncentiveController : ControllerBase
    {
        private readonly ILogger<Incentive> logger;
        private readonly IIncentive iincentives;
    
        public IncentiveController(ILogger<Incentive> _logger,IIncentive _iincentives)
        {
            logger = _logger;
            iincentives = _iincentives;
         
        }
           
        [HttpPost("getIncentives")]
        //[Authorize]
        public List<Incentive> getIncentives([FromBody] RequestParams requestParams)
        {
           
            List<Incentive> incentives = new List<Incentive>();
            incentives = iincentives.getIncentives(requestParams);
            return incentives;
        }


        [HttpPost("getIncentive")]
       // [Authorize]
        public Incentive getIncentive([FromBody] int id)
        {
            Incentive incentive= new Incentive();
            incentive = iincentives.getIncentive(id);
            return incentive;
        }

        [HttpPost("deleteIncentive")]
        //[Authorize]
        public DbResult deleteIncentive([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iincentives.deleteIncentive(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateIncentive")]
       // [Authorize]
        public DbResult createOrUpdateIncentive([FromBody] Incentive incentive)
        {
            DbResult dbResult = new DbResult();
            dbResult = iincentives.createOrUpdateIncentive(incentive);
            return dbResult;
        }
    }
}
