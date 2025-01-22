using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IReleaseDocument
    {
        DbResult createOrUpdateReleaseDocument(ReleaseDocument releasedocument);
        DbResult deleteReleaseDocument(int id);
        DbResult receiveReleaseDocument(RequestParams requestParams);
        ReleaseDocument getReleaseDocument(int id);
        ReleaseDocument getUserByUsername(string username);

        List<ReleaseDocument> getReleaseDocuments(RequestParams requestParams);
    }
}
