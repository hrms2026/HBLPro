using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ILogger<SupplierController> logger;
        private readonly IUser iuser;
        private readonly ISupplier isupplier;

        public SupplierController(ILogger<SupplierController> _logger,IUser _iuser,ISupplier _isupplier)
        {
            logger = _logger;
            iuser = _iuser;
            isupplier = _isupplier;

        }
        [HttpPost("getSuppliers")]
      //  [Authorize]
        public IEnumerable<Supplier> getSuppliers()
        {
            IEnumerable<Supplier> suppliers =Enumerable.Empty<Supplier>();
            suppliers = isupplier.getSuppliers();
            return suppliers;
        }
        [HttpPost("deleteSupplier")]
        [Authorize]
        public DbResult deleteSupplier([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = isupplier.deleteSupplier(id);
            return dbResult;
        }

        [HttpPost("getSupplier")]
        [Authorize]
        public Supplier getSupplier([FromBody] int id)
        {
            Supplier supplier = new Supplier();
            supplier = isupplier.getSupplier(id);
            return supplier;
        }
        [HttpPost("createOrUpdateSupplier")]
        [Authorize]
        public DbResult createOrUpdateSupplier([FromBody] Supplier supplier)
        {
            DbResult dbResult = new DbResult();
            dbResult = isupplier.createOrUpdateSupplier(supplier);
            return dbResult;
        }


    }
}
