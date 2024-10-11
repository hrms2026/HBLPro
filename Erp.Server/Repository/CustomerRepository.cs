using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class CustomerRepository : ICustomer
    {
        private DBContext db;
        public CustomerRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateCustomer(Customer customer)
        {
            var c_id = new SqlParameter("c_id", customer.c_id + "");
            var c_name = new SqlParameter("c_name", customer.c_name + "");
            var c_active_yn = new SqlParameter("c_active_yn", customer.c_active_yn + "");
            var c_cre_by = new SqlParameter("c_cre_by", customer.c_cre_by + "");
          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateCustomer @c_id,@c_name,@c_active_yn,@c_cre_by;",
                c_id, c_name, c_active_yn, c_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteCustomer(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteCustomer @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Customer getCustomer(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var customer = db.Set<Customer>().FromSqlRaw("EXEC dbo.getCustomer @id;", _id).ToList().FirstOrDefault() ?? new Customer();
            return customer;
        }

        public IEnumerable<Customer> getCustomers()
        {
            var customers = db.Set<Customer>().FromSqlRaw("EXEC dbo.getCustomers;").ToList();
            return customers;
        }
    }
}
