using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly ILogger<Promotion> logger;
        private readonly IPromotion ipromotions;
    
        public PromotionController(ILogger<Promotion> _logger,IPromotion _ipromotions)
        {
            logger = _logger;
            ipromotions = _ipromotions;
         
        }
           
        [HttpPost("getPromotions")]
        //[Authorize]
        public List<Promotion> getPromotions()
        {

            List<Promotion> promotions = new List<Promotion>();
            promotions = ipromotions.getPromotions();
            return promotions;
        }


        [HttpPost("getPromotion")]
       // [Authorize]
        public Promotion getPromotion([FromBody] int id)
        {
            Promotion promotion = new Promotion();
            promotion = ipromotions.getPromotion(id);
            return promotion;
        }

        [HttpPost("deletePromotion")]
        //[Authorize]
        public DbResult deletePromotion([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = ipromotions.deletePromotion(id);
            return dbResult;
        }

        [HttpPost("createOrUpdatePromotion")]
       // [Authorize]
        public DbResult createOrUpdatePromotion([FromBody] Promotion promotion)
        {
            DbResult dbResult = new DbResult();
            dbResult = ipromotions.createOrUpdatePromotion(promotion);
            return dbResult;
        }
    }
}
