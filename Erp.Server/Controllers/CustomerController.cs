using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> logger;
        private readonly IUser iuser;
        private readonly ICustomer icustomer;

        public CustomerController(ILogger<CustomerController> _logger,IUser _iuser,ICustomer _icustomer)
        {
            logger = _logger;
            iuser = _iuser;
            icustomer = _icustomer;

        }
        [HttpPost("getCustomers")]
        [Authorize]
        public IEnumerable<Customer> getCustomers()
        {
            IEnumerable<Customer> customers =Enumerable.Empty<Customer>();
            customers = icustomer.getCustomers();
            return customers;
        }
        [HttpPost("deleteCustomer")]
        [Authorize]
        public DbResult deleteCustomer([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = icustomer.deleteCustomer(id);
            return dbResult;
        }

        [HttpPost("getCustomer")]
        [Authorize]
        public Customer getCustomer([FromBody] int id)
        {
            Customer customer = new Customer();
            customer = icustomer.getCustomer(id);
            return customer;
        }
        [HttpPost("createOrUpdateCustomer")]
        [Authorize]
        public DbResult createOrUpdateCustomer([FromBody] Customer customer)
        {
            DbResult dbResult = new DbResult();
            dbResult = icustomer.createOrUpdateCustomer(customer);
            return dbResult;
        }


    }
}
