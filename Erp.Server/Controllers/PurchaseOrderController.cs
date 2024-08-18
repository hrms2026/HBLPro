using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly ILogger<PurchaseOrder> logger;
        private readonly IUser iusers;
        private readonly IPurchaseOrder ipurchaseOrder;
     
        public PurchaseOrderController(ILogger<PurchaseOrder> logger,IUser iusers, IConfiguration configuration, IPurchaseOrder ipurchaseOrder)
        {
            this.logger = logger;
            this.iusers = iusers;
            this.ipurchaseOrder = ipurchaseOrder;
          
        }

        [HttpPost("getPurchaseOrders")]
        [Authorize]
        public List<PurchaseOrder> getPurchaseOrders()
        {

            List<PurchaseOrder> purchaseOrders = new  List<PurchaseOrder>();
            purchaseOrders = ipurchaseOrder.getPurchaseOrders();
            return purchaseOrders;
        }


        [HttpPost("getPurchaseOrder")]
        [Authorize]
        public PurchaseOrder getPurchaseOrder([FromBody]  int id)
        {
            PurchaseOrder purchaseOrder = ipurchaseOrder.getPurchaseOrder(id);
            return purchaseOrder;
        }

        [HttpPost("createOrUpdatePurchaseOrder")]
        [Authorize]
        public DbResult createOrUpdatePurchaseOrder([FromBody]  PurchaseOrder purchaseOrder)
        {
            DbResult  dbResult = ipurchaseOrder.createOrUpdatePurchaseOrder(purchaseOrder);
            return dbResult;
        }

        [HttpPost("deletePurchaseOrder")]
        [Authorize]
        public DbResult createPurchaseOrder([FromBody]  int id)
        {
            DbResult dbResult = ipurchaseOrder.deletePurchaseOrder(id);
            return dbResult;
        }

    }
}
