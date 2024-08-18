using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Runtime.CompilerServices;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IUser _iusers;
        private readonly ILogin _ilogin;
        private readonly IJwtAuthManager _jwtAuthManager;

        public LoginController(ILogger<LoginController> logger, IUser iusers, ILogin ilogin, IJwtAuthManager jwtAuthManager)
        {
            _logger = logger;
            _iusers = iusers;
            _ilogin = ilogin;
            _jwtAuthManager = jwtAuthManager;
        }

        [HttpPost("getlogin")]
        public ActionResult<Credentials> GetLogin([FromBody] Login Login)
        {
            if (string.IsNullOrEmpty(Login.username)  || string.IsNullOrEmpty(Login.password))
            {
                return BadRequest(new Credentials { message = "Please Enter All Data !!" });
            }

            try
            {
                var dbResult = _ilogin.getlogin(Login.username, Login.password);
                if (dbResult.message == "Success")
                {
                    User user = _iusers.getUserByUsername(Login.username);
                    user.u_password = "";
                    var token = _jwtAuthManager.GenerateToken(  Login.username);
                    var credentials = new Credentials
                    {
                        username = Login.username,
                        token = token,
                        message = dbResult.message,
                        user = user

                    };
                    return Ok(credentials);
                }
                else
                {
                    return Unauthorized(new Credentials { username = Login.username, message = dbResult.message,user=null });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the login request.");
                return StatusCode(StatusCodes.Status500InternalServerError, new Credentials { message = "An error occurred while processing the request." });
            }
        }
    }
}
