using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly ILogger<Machine> logger;
        private readonly IMachine imachines;
    
        public MachineController(ILogger<Machine> _logger,IMachine _imachines)
        {
            logger = _logger;
            imachines = _imachines;
         
        }
           
        [HttpPost("getMachines")]
        //[Authorize]
        public List<Machine> getMachines()
        {

            List<Machine> machines = new List<Machine>();
            machines = imachines.getMachines();
            return machines;
        }


        [HttpPost("getMachine")]
       // [Authorize]
        public Machine getMachine([FromBody] int id)
        {
            Machine machine = new Machine();
            machine = imachines.getMachine(id);
            return machine;
        }

        [HttpPost("deleteMachine")]
        //[Authorize]
        public DbResult deleteMachine([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = imachines.deleteMachine(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateMachine")]
       // [Authorize]
        public DbResult createOrUpdateMachine([FromBody] Machine machine)
        {
            DbResult dbResult = new DbResult();
            dbResult = imachines.createOrUpdateMachine(machine);
            return dbResult;
        }
    }
}
