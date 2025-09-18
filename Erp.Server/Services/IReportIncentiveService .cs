using Erp.Server.Models;
using System.Data;

namespace Erp.Server.Services
{
    public interface IReportIncentive
    {
        DataTable getIncentiveReport(ReportParms reportParms);
    }
}


