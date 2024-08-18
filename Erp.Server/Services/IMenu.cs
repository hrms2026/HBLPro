using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IMenu
    {
        public List<Menu> getMenus();
        Menu getMenu(int id);
        List<MenuType> getMenuTypes();
        List<Menu> getMenusByType(string type);
        List<Menu> getMenusByRoleAndType(int id, string type);
        DbResult deleteMenu(int id);
        DbResult createOrUpdateMenu(Menu menu);
        DbResult getMenusByUser(int id);
        List<Menu> getMenuItemByRoleAndParrent(int role, int parrent);
    }
}
