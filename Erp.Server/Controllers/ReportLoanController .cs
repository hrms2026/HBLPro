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
    public class ReportLoanController : ControllerBase
    {
        private readonly ILogger<ReportLoanController> logger;
        private readonly IUser iuser;
        private readonly IReportLoan ireportloan;

        public ReportLoanController(ILogger<ReportLoanController> _logger, IUser _iuser, IReportLoan _ireportloan)
        {
            logger = _logger;
            iuser = _iuser;
            ireportloan = _ireportloan;

        }

        [HttpPost("getLoanReport")]
        [Authorize]
        public ActionResult getLoanReport([FromBody] ReportParms reportParms)
        {
            DataTableConvert dataTableConvert = new DataTableConvert();

            DataTable report = ireportloan.getLoanReport(reportParms);

            var list = dataTableConvert.ConvertDataTableToList(report);

            return Ok(list);
        }

    }
}
