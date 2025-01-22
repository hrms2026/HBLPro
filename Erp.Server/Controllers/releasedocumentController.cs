using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReleaseDocumentController : ControllerBase
    {
        private readonly ILogger<ReleaseDocument> logger;
        private readonly IReleaseDocument ireleaseDocuments;
    
        public ReleaseDocumentController(ILogger<ReleaseDocument> _logger,IReleaseDocument _ireleasedocuments)
        {
            logger = _logger;
            ireleaseDocuments = _ireleasedocuments;
         
        }
           
        [HttpPost("getReleaseDocuments")]
       // [Authorize]
        public List<ReleaseDocument> getReleaseDocuments([FromBody] RequestParams requestParams)
        {

            List<ReleaseDocument> releasedocuments = new List<ReleaseDocument>();
            releasedocuments= ireleaseDocuments.getReleaseDocuments(requestParams);
            return releasedocuments ;
        }


        [HttpPost("getReleaseDocument")]
     //   [Authorize]
        public ReleaseDocument getReleaseDocument([FromBody] int  id)
        {
            ReleaseDocument releasedocument = new ReleaseDocument();
            releasedocument = ireleaseDocuments.getReleaseDocument(id);
            return releasedocument;
        }

        [HttpPost("deleteReleaseDocument")]
     //   [Authorize]
        public DbResult deleteReleaseDocument([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = ireleaseDocuments.deleteReleaseDocument(id);
            return dbResult;
        }


        [HttpPost("receiveReleaseDocument")]
        //   [Authorize]
        public DbResult receiveReleaseDocument([FromBody] RequestParams requestParams )
        {
            DbResult dbResult = new DbResult();
            dbResult = ireleaseDocuments.receiveReleaseDocument(requestParams);
            return dbResult;
        }

        [HttpPost("createOrUpdateReleaseDocument")]
      //  [Authorize]
        public DbResult createOrUpdateReleaseDocument([FromBody] ReleaseDocument releasedocument)
        {
            DbResult dbResult = new DbResult();
            dbResult = ireleaseDocuments.createOrUpdateReleaseDocument(releasedocument);
            return dbResult;
        }
    }
}
