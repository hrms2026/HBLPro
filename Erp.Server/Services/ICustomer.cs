using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICustomer
    {
        DbResult createOrUpdateCustomer(Customer customer);
        DbResult deleteCustomer(int id);
        Customer getCustomer(int id);
        public IEnumerable<Customer> getCustomers();
    }
}
