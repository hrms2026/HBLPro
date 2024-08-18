using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IPurchaseOrder
    {
        List<PurchaseOrder> getPurchaseOrders();
        DbResult createOrUpdatePurchaseOrder(PurchaseOrder purchaseOrder);
        DbResult deletePurchaseOrder(int id);
        PurchaseOrder getPurchaseOrder(int id);
    }
}
