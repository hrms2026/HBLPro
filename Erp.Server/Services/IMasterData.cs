using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IMasterData
    {
        DbResult createOrUpdateMasterData(MasterData masterData);
        DbResult deleteMasterData(int id);
        MasterData getMasterData(int id);
        List<MasterData> getMasterDatas();
        List<MasterData> getMasterDatasByType(RequestParams requestParams);
        List<MasterType> getMasterDataTypes();
    }
}
