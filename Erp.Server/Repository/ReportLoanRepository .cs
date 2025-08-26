using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;


namespace Erp.Server.Repository
{
    public class ReportLoanRepository : IReportLoan
    {
        private DBContext db;
        public ReportLoanRepository(DBContext _db)
        {
            db = _db;
        }

        public DataTable getLoanReport(ReportParms reportParms)
        {
            var dataTable = new DataTable();
            using (var connection = db.Database.GetDbConnection())
            {
                connection.Open();

                using var command = connection.CreateCommand();
                command.CommandText = "getLoanReport";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@rp_report_type", reportParms.rp_report_type));
                command.Parameters.Add(new SqlParameter("@rp_date_range", reportParms.rp_date_range));
                command.Parameters.Add(new SqlParameter("@rp_user", reportParms.rp_user));
                command.Parameters.Add(new SqlParameter("@rp_company_id", reportParms.rp_company_id));
                using var reader = command.ExecuteReader();
                dataTable.Load(reader);
            }

            return dataTable;
        }
    }
}
