using Erp.Server.Models;
using System.Data;

namespace Erp.Server.Services
{
    public interface IReport
    {
        DataTable getAttandanceReport(ReportParms reportParms);
    }
}


