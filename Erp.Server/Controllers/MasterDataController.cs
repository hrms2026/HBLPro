using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterDataController : ControllerBase
    {
        private readonly ILogger<MasterDataController> logger;
        private readonly IUser iuser;
        private readonly IMasterData imasterdata;
        private readonly IRole irole;

        public MasterDataController(ILogger<MasterDataController> logger,IUser iuser, IMasterData imasterdata,IRole irole)
        {
            this.logger = logger;
            this.iuser = iuser;
            this.imasterdata = imasterdata;
            this.irole = irole;

        }
        [HttpPost("getMasterDatas")]
        [Authorize]
        public List<MasterData> getMasterDatas()
        {
            List<MasterData> masterdatas =new List<MasterData>();
            masterdatas = imasterdata.getMasterDatas();
            return masterdatas;
        }
        [HttpPost("deleteMasterData")]
        [Authorize]
        public DbResult deleteMasterData([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = imasterdata.deleteMasterData(id);
            return dbResult;
        }

        [HttpPost("getMasterData")]
        [Authorize]
        public MasterData getMasterData([FromBody] int id)
        {
            MasterData masterdata = new MasterData();
            masterdata = imasterdata.getMasterData(id);
            return masterdata;
        }
        [HttpPost("createOrUpdateMasterData")]
        [Authorize]
        public DbResult createOrUpdateMasterData([FromBody] MasterData masterdata)
        {
            DbResult dbResult = new DbResult();
            dbResult = imasterdata.createOrUpdateMasterData(masterdata);
            return dbResult;
        }

        [HttpPost("getMasterDatasByType")]
        [Authorize]
        public List<MasterData> getMasterDatasByType([FromBody] RequestParams requestParams)
        {
            List<MasterData> masterdatas = new List<MasterData>();
            masterdatas = imasterdata.getMasterDatasByType(requestParams);
            return masterdatas;
        }

        [HttpPost("getMasterDataTypes")]
        [Authorize]
        public List<MasterType> getMasterDataTypes()
        {
            var masterDataTypes = imasterdata.getMasterDataTypes();
            return masterDataTypes;
        }

    }
}
