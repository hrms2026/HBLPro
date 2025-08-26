using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IAttachments
    {
        public List<Attachments> getAttachments();
        Attachments getAttachment(int id);
        DbResult deleteAttachment(int id);
        DbResult createOrUpdateAttachment(Attachments attachment);
    }
}
