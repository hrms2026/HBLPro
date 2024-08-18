using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Erp.Server.Repository
{
    public class MenuRepository : IMenu
    {
       
        List<Menu> menus = new List<Menu>();

        Menu menu = new Menu();

        private DBContext db;
        public MenuRepository(DBContext _db)
        {
            db = _db;

        }

        public List<Menu> getMenus()
        {
            var menus = db.Set<Menu>().FromSqlRaw("EXEC dbo.getMenus;").ToList();
            return menus;
        }

        public Menu getMenu(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var menu = db.Set<Menu>().FromSqlRaw("EXEC dbo.getMenu @id;", _id).ToList().FirstOrDefault() ?? new Menu(); 
            return menu;
        }

        public List<Menu> getMenusByType(string type)
        {
            var _type = new SqlParameter("type", type + "");
            var menus = db.Set<Menu>().FromSqlRaw("EXEC dbo.getMenusByType @type;", _type).ToList();
            return menus;
           
        } 
        public List<Menu> getMenusByRoleAndType(int id ,string type)
        {
            var _type = new SqlParameter("type", type + "");
            var _id = new SqlParameter("id", id + "");
            var menus = db.Set<Menu>().FromSqlRaw("EXEC dbo.getMenusByRoleAndType @id,@type;", _id, _type).ToList();
            return menus;
           
        }

        public List<MenuType> getMenuTypes()
        {
            var menutype = db.Set<MenuType>().FromSqlRaw("EXEC dbo.getMenuTypes;").ToList() ?? new List<MenuType>();
            return menutype;
        }

        public DbResult deleteMenu(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbResult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteMenu @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbResult;
        }

        public DbResult createOrUpdateMenu(Menu menu)
        {
            var m_id = new SqlParameter("m_id", menu.m_id + "");
            var m_name = new SqlParameter("m_name", menu.m_name + "");
            var m_link = new SqlParameter("m_link", menu.m_link + "");
            var m_fa_icon = new SqlParameter("m_fa_icon", menu.m_fa_icon + "");
            var m_type = new SqlParameter("m_type", menu.m_type + "");
            var m_parrent = new SqlParameter("m_parrent", menu.m_parrent + "");
            var m_cre_by = new SqlParameter("m_cre_by", menu.m_cre_by + "");
            var dbResult = db.Set<DbResult>()
                .FromSqlRaw("EXEC dbo.createOrUpdateMenu @m_id,@m_name,@m_link,@m_fa_icon,@m_parrent,@m_type,@m_cre_by;",
                m_id, m_name, m_link, m_fa_icon, m_parrent,m_type,m_type ,m_cre_by                        
                ).ToList().FirstOrDefault() ?? new DbResult();

            return dbResult;
        }

        public DbResult getMenusByUser(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbResult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteMenu @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbResult;
        }

        public List<Menu> getMenuItemByRoleAndParrent(int role, int parrent)
        {
            var _role = new SqlParameter("role", role + "");
            var _parrent = new SqlParameter("parrent", parrent + "");
            var menus = db.Set<Menu>().FromSqlRaw("EXEC dbo.getMenuItemByRoleAndParrent @role,@parrent;", _role, _parrent).ToList();
            return menus;
        }
    }
}
