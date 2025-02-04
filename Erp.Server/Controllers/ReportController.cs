using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using System.Data;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> logger;
        private readonly IUser iuser;
        private readonly IReport ireport;

        public ReportController(ILogger<ReportController> _logger, IUser _iuser, IReport _ireport)
        {
            logger = _logger;
            iuser = _iuser;
            ireport = _ireport;

        }

        [HttpPost("getAttandanceReport")]
        [Authorize]
        public ActionResult getAttandanceReport([FromBody] ReportParms reportParms)
        {
            DataTableConvert dataTableConvert = new DataTableConvert();

            DataTable report = ireport.getAttandanceReport(reportParms);

            var list = dataTableConvert.ConvertDataTableToList(report);

            return Ok(list);
        }

    }
}
