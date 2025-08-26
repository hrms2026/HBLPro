using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class AttachmentsRepository : IAttachments
    {
        private DBContext db;
        public AttachmentsRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateAttachment(Attachments attachment)
        {
            var a_id = new SqlParameter("a_id", attachment.a_id + "");
            var a_name = new SqlParameter("a_name", attachment.a_name + "");
            var a_path = new SqlParameter("a_path", attachment.a_path + "");
            var a_cre_by = new SqlParameter("a_cre_by", attachment.a_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateAttachment @a_id,@a_name,@a_path,@a_cre_by;",
                a_id, a_name,a_path,a_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteAttachment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteAttachment @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Attachments getAttachment(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var attachment= db.Set<Attachments>().FromSqlRaw("EXEC dbo.getAttachment @id;", _id).ToList().FirstOrDefault() ?? new Attachments();
            return attachment;
        }

        public List<Attachments> getAttachments()
        {
            var attachments = db.Set<Attachments>().FromSqlRaw("EXEC dbo.getAttachments;").ToList();
            return attachments;
        } 

       
    }
}
