using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;


namespace Erp.Server.Repository
{
    public class ReportRepository : IReport
    {
        private DBContext db;
        public ReportRepository(DBContext _db)
        {
            db = _db;
        }

        public DataTable getAttandanceReport(ReportParms reportParms)
        {
            var dataTable = new DataTable();
            using (var connection = db.Database.GetDbConnection())
            {
                connection.Open();

                using var command = connection.CreateCommand();
                command.CommandText = "getAttandanceReport";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@rp_report_type", reportParms.rp_report_type));
                command.Parameters.Add(new SqlParameter("@rp_date_range", reportParms.rp_date_range));
                command.Parameters.Add(new SqlParameter("@rp_user", reportParms.rp_user));
                using var reader = command.ExecuteReader();
                dataTable.Load(reader);
            }

            return dataTable;
        }
    }
}
