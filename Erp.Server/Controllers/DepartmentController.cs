using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly ILogger<Department> logger;
        private readonly IDepartment idepartments;
    
        public DepartmentController(ILogger<Department> _logger,IDepartment _idepartments)
        {
            logger = _logger;
            idepartments = _idepartments;
         
        }
           
        [HttpPost("getDepartments")]
        //[Authorize]
        public List<Department> getDepartments()
        {

            List<Department> departments = new List<Department>();
            departments = idepartments.getDepartments();
            return departments;
        }


        [HttpPost("getDepartment")]
       // [Authorize]
        public Department getDepartment([FromBody] int id)
        {
            Department department = new Department();
            department = idepartments.getDepartment(id);
            return department;
        }

        [HttpPost("deleteDepartment")]
        //[Authorize]
        public DbResult deleteDepartment([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = idepartments.deleteDepartment(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateDepartment")]
       // [Authorize]
        public DbResult createOrUpdateDepartment([FromBody] Department department)
        {
            DbResult dbResult = new DbResult();
            dbResult = idepartments.createOrUpdateDepartment(department);
            return dbResult;
        }
    }
}
