using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class UserRepository : IUser
    {
        private DBContext db;
        public UserRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateUser(User user)
        {
            var u_id = new SqlParameter("u_id", user.u_id + "");
            var u_name = new SqlParameter("u_name", user.u_name + "");
            var u_username = new SqlParameter("u_username", user.u_username + "");
            var u_password = new SqlParameter("u_password", user.u_password + "");
            var u_email = new SqlParameter("u_email", user.u_email + "");
            var u_is_admin = new SqlParameter("u_is_admin", user.u_is_admin + "");
            var u_active_yn = new SqlParameter("u_active_yn", user.u_active_yn + "");
            var u_role_id = new SqlParameter("u_role_id", user.u_role_id + "");
            var u_cre_by = new SqlParameter("u_cre_by", user.u_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateUser @u_id,@u_name,@u_username,@u_password,@u_email,@u_role_id,@u_is_admin,@u_active_yn,@u_cre_by;",
                u_id,u_name, u_username, u_password, u_email, u_role_id, u_is_admin, u_active_yn, u_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteUser(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteUser @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public User getUser(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var user = db.Set<User>().FromSqlRaw("EXEC dbo.getUser @id;", _id).ToList().FirstOrDefault() ?? new User();
            return user;
        }

        public User getUserByUsername(string username)
        {
            var _username = new SqlParameter("username", username + "");
            var user = db.Set<User>().FromSqlRaw("EXEC dbo.getUserByUsername @username;", _username).ToList().FirstOrDefault() ?? new User();
            return user;
        }

        public IEnumerable<User> getUsers()
        {
            var users = db.Set<User>().FromSqlRaw("EXEC dbo.getUsers;").ToList();
            return users;
        }
    }
}
