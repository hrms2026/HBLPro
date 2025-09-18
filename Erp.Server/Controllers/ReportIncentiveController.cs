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
    public class ReportIncentiveController : ControllerBase
    {
        private readonly ILogger<ReportLoanController> logger;
        private readonly IUser iuser;
        private readonly IReportIncentive ireportincentive;

        public ReportIncentiveController(ILogger<ReportLoanController> _logger, IUser _iuser, IReportIncentive _ireportincentive)
        {
            logger = _logger;
            iuser = _iuser;
            ireportincentive = _ireportincentive;

        }

        [HttpPost("getIncentiveReport")]
        [Authorize]
        public ActionResult getIncentiveReport([FromBody] ReportParms reportParms)
        {
            DataTableConvert dataTableConvert = new DataTableConvert();

            DataTable report = ireportincentive.getIncentiveReport(reportParms);

            var list = dataTableConvert.ConvertDataTableToList(report);

            return Ok(list);
        }

    }
}
