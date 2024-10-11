using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class CategoryRepository : ICategory
    {
        private DBContext db;

        public CategoryRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateCategory(Category category)
        {
            var ct_id = new SqlParameter("ct_id", category.ct_id + "");
            var ct_name = new SqlParameter("ct_name", category.ct_name ?? (object)DBNull.Value);
            var ct_type = new SqlParameter("ct_type", category.ct_type ?? (object)DBNull.Value);
            var ct_active_yn = new SqlParameter("ct_active_yn", category.ct_active_yn ?? (object)DBNull.Value);
            var ct_cre_by = new SqlParameter("ct_cre_by", category.ct_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateCategory @ct_id,@ct_name,@ct_type,@ct_active_yn,@ct_cre_by;",
                ct_id, ct_name, ct_type, ct_active_yn, ct_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteCategory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteCategory @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Category getCategory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var category = db.Set<Category>().FromSqlRaw("EXEC dbo.getCategory @id;", _id).ToList().FirstOrDefault() ?? new Category();
            return category;
        }

        public List<Category> getCategories()
        {
            var categories = db.Set<Category>().FromSqlRaw("EXEC dbo.getCategories;").ToList();
            return categories;
        }
    }

}
