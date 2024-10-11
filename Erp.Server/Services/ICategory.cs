using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICategory
    {
        DbResult createOrUpdateCategory(Category category);
        DbResult deleteCategory(int id);
        Category getCategory(int id);
        List<Category> getCategories();
    }

}
