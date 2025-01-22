using Erp.Server.Controllers;
using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Net;


namespace Erp.Server.Repository
{
    public class ReleaseDocumentRepository : IReleaseDocument
    {
        private DBContext db;
        public ReleaseDocumentRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateReleaseDocument(ReleaseDocument releasedocument)
        {
            var rd_id = new SqlParameter("rd_id",releasedocument.rd_id + "");
            var rd_emp_id = new SqlParameter("rd_emp_id", releasedocument.rd_emp_id + "");
            var rd_passport_no = new SqlParameter("rd_passport_no",releasedocument.rd_passport_no + "");
            var rd_cre_by = new SqlParameter("rd_cre_by", releasedocument.rd_cre_by + "");
            var rd_released_to = new SqlParameter("rd_released_to", releasedocument.rd_released_to + "");
            var rd_released_date = new SqlParameter("rd_released_date", releasedocument.rd_released_date + "");
            var rd_reason = new SqlParameter("rd_reason", releasedocument.rd_reason + "");
           

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateReleaseDocument @rd_id,@rd_emp_id,@rd_passport_no,@rd_cre_by,@rd_released_to,@rd_released_date,@rd_reason;",
                rd_id, rd_emp_id,rd_passport_no,rd_cre_by,rd_released_to, rd_released_date, rd_reason).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteReleaseDocument(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteReleaseDocument @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult receiveReleaseDocument(RequestParams requestParams)
        {
            var _id = new SqlParameter("id", requestParams.id + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.receiveReleaseDocument @id,@user;", _id, _user).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public ReleaseDocument  getReleaseDocument(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var releaseDocument = db.Set<ReleaseDocument>().FromSqlRaw("EXEC dbo.getReleaseDocument @id;", _id).ToList().FirstOrDefault() ?? new ReleaseDocument();
            return releaseDocument;
        }

        public ReleaseDocument getUserByUsername(string username)
        {
            var _username = new SqlParameter("username", username + "");
            var releasedocument = db.Set<ReleaseDocument>().FromSqlRaw("EXEC dbo.getUserByUsername @username;", _username).ToList().FirstOrDefault() ?? new ReleaseDocument();
            return releasedocument;
        }

        public List<ReleaseDocument> getReleaseDocuments(RequestParams requestParams)
        {
            var _flag = new SqlParameter("flag", requestParams.flag + "");
            var _daterange = new SqlParameter("daterange", requestParams.daterange + "");
            var releasedocuments = db.Set<ReleaseDocument>().FromSqlRaw("EXEC dbo.getReleaseDocuments @flag,@daterange;", _flag, _daterange).ToList();
            return releasedocuments;
        }
    }
}
