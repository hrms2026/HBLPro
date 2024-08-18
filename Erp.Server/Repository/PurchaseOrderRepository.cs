using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class PurchaseOrderRepository : IPurchaseOrder
    {
        private DBContext db;
        public PurchaseOrderRepository(DBContext _db)
        {
            db = _db;
        }
        public List<PurchaseOrder> getPurchaseOrders()
        {
            var purchaseOrders = db.Set<PurchaseOrder>().FromSqlRaw("EXEC dbo.getPurchaseOrders;").ToList();
            return purchaseOrders;
        }
        public DbResult createOrUpdatePurchaseOrder([FromBody] PurchaseOrder   purchaseOrder)
        {
            var po_id = new SqlParameter("p_id", purchaseOrder.po_id + "");
            var po_make = new SqlParameter("po_make", purchaseOrder.po_make + "");
            var po_model = new SqlParameter("po_model", purchaseOrder.po_model + "");
            var po_processor = new SqlParameter("po_processor", purchaseOrder.po_processor + "");
            var po_harddisk = new SqlParameter("po_harddisk", purchaseOrder.po_harddisk + "");
            var po_ram = new SqlParameter("po_ram", purchaseOrder.po_ram + "");
            var po_cre_by = new SqlParameter("po_cre_by", purchaseOrder.po_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdatePurchaseOrder @p_id,@po_make,@po_model,@po_processor,@po_harddisk,@po_ram,@po_cre_by",
                po_id, po_make, po_model, po_processor, po_harddisk, po_ram, po_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deletePurchaseOrder([FromBody]  int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deletePurchaseOrder @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public PurchaseOrder getPurchaseOrder([FromBody]  int id)
        {
            var _id = new SqlParameter("id", id + "");
            var purchaseOrder = db.Set<PurchaseOrder>().FromSqlRaw("EXEC dbo.getPurchaseOrder @id;", _id).ToList().FirstOrDefault() ?? new PurchaseOrder();
            return purchaseOrder;
        }

     
    }
}
