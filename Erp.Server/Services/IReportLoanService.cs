using Erp.Server.Models;
using System.Data;

namespace Erp.Server.Services
{
    public interface IReportLoan
    {
        DataTable getLoanReport(ReportParms reportParms);
    }
}


