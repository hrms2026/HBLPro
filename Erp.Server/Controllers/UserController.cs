using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<User> logger;
        private readonly IUser iusers;
    
        public UserController(ILogger<User> _logger,IUser _iusers)
        {
            logger = _logger;
            iusers = _iusers;
         
        }
           
        [HttpPost("getUsers")]
        [Authorize]
        public IEnumerable<User> getUsers()
        {

            IEnumerable<User> users = Enumerable.Empty<User>();
            users = iusers.getUsers();
            return users;
        }


        [HttpPost("getUser")]
        [Authorize]
        public User getUser([FromBody] int id)
        {
            User user = new User();
            user = iusers.getUser(id);
            return user;
        }

        [HttpPost("deleteUser")]
        [Authorize]
        public DbResult deleteUser([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iusers.deleteUser(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateUser")]
        [Authorize]
        public DbResult createOrUpdateUser([FromBody] User user)
        {
            DbResult dbResult = new DbResult();
            dbResult = iusers.createOrUpdateUser(user);
            return dbResult;
        }
    }
}
