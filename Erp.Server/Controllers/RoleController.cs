using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> logger;
        private readonly IUser iuser;
        private readonly IRole irole;

        public RoleController(ILogger<RoleController> _logger,IUser _iuser,IRole _irole)
        {
            logger = _logger;
            iuser = _iuser;
            irole = _irole;

        }
        [HttpPost("getRoles")]
        [Authorize]
        public IEnumerable<Role> getRoles()
        {
            IEnumerable<Role> roles =Enumerable.Empty<Role>();
            roles = irole.getRoles();
            return roles;
        }
        [HttpPost("deleteRole")]
        [Authorize]
        public DbResult deleteRole([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = irole.deleteRole(id);
            return dbResult;
        }

        [HttpPost("getRole")]
        [Authorize]
        public Role getRole([FromBody] int id)
        {
            Role role = new Role();
            role = irole.getRole(id);
            return role;
        }
        [HttpPost("createOrUpdateRole")]
        [Authorize]
        public DbResult createOrUpdateRole([FromBody] Role role)
        {
            DbResult dbResult = new DbResult();
            dbResult = irole.createOrUpdateRole(role);
            return dbResult;
        }


    }
}
