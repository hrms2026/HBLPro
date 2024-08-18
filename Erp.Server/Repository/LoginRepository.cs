using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class LoginRepository : ILogin
    {
        private DBContext db;
        public LoginRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult getlogin(string username, string password)
        {
            var _username = new SqlParameter("username", username + "");
            var _Password = new SqlParameter("password", password + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.getlogin @username,@password;", _username, _Password).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }
    }
}
