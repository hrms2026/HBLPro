using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ISupplier
    {
        DbResult createOrUpdateSupplier(Supplier supplier);
        DbResult deleteSupplier(int id);
        Supplier getSupplier(int id);
        public IEnumerable<Supplier> getSuppliers();
    }
}
