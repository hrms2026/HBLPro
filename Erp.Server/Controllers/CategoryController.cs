using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> logger;
        private readonly IUser iuser;
        private readonly ICategory icategory;

        public CategoryController(ILogger<CategoryController> _logger, IUser _iuser, ICategory _icategory)
        {
            logger = _logger;
            iuser = _iuser;
            icategory = _icategory;
        }

        [HttpPost("getCategories")]
        [Authorize]
        public List<Category> getCategories()
        {
            List<Category> categories = new List<Category>();
            categories = icategory.getCategories();
            return categories;
        }

        [HttpPost("deleteCategory")]
        [Authorize]
        public DbResult deleteCategory([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = icategory.deleteCategory(id);
            return dbResult;
        }

        [HttpPost("getCategory")]
        [Authorize]
        public Category getCategory([FromBody] int id)
        {
            Category category = new Category();
            category = icategory.getCategory(id);
            return category;
        }

        [HttpPost("createOrUpdateCategory")]
        [Authorize]
        public DbResult createOrUpdateCategory([FromBody] Category category)
        {
            DbResult dbResult = new DbResult();
            dbResult = icategory.createOrUpdateCategory(category);
            return dbResult;
        }
    }

}
