using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly ILogger<Menu> logger;
        private readonly IUser iusers;
        private readonly IMenu imenu;
        private readonly IRoleMenu irolemenu;
        public MenuController(ILogger<Menu> logger,IUser iusers, IMenu imenu,IRoleMenu roleMenu)
        {
            this.logger = logger;
            this.iusers = iusers;
            this.imenu =  imenu;
            this.irolemenu = roleMenu;
           
        }

        [HttpPost("getMenus")]
        [Authorize]
        public List<Menu> getMenus()
        {

            List<Menu> menus = new List<Menu>();
            menus = imenu.getMenus();
            return menus;
        }

        [HttpPost("getMenu")]
        [Authorize]
        public Menu getMenu([FromBody] int id)
        {
            Menu menu = new Menu();
            menu = imenu.getMenu(id);
            return menu;
        }
        [HttpPost("getMenuTypes")]
        [Authorize]
        public List<MenuType> getMenuTypes()
        {
           var  menuType = imenu.getMenuTypes();
            return menuType;
        }

        [HttpPost("getMenusByType")]
        [Authorize]
        public List<Menu> getMenusByType([FromBody] RequestParams requestParams )
        {
            List<Menu> menus = new List<Menu>();
            menus = imenu.getMenusByType(requestParams.type);
            return menus;
        } 

        [HttpPost("getMenusByRoleAndType")]
        [Authorize]
        public List<Menu> getMenusByRoleAndType([FromBody] RequestParams requestParams )
        {
            List<Menu> menus = new List<Menu>();
            menus = imenu.getMenusByRoleAndType(requestParams.id,requestParams.type);
            return menus;
        }

        [HttpPost("deleteMenu")]
        [Authorize]
        public DbResult deleteMenu([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = imenu.deleteMenu(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateMenu")]
        [Authorize]
        public DbResult createOrUpdateMenu([FromBody] Menu menu)
        {
            DbResult dbResult = new DbResult();
            dbResult = imenu.createOrUpdateMenu(menu);
            return dbResult;
        }
        
        [HttpPost("createOrUpdateRoleMenu")]
        [Authorize]
        public DbResult createOrUpdateRoleMenu([FromBody] MenuAllocation menuAllocation)
        {
            DbResult dbResult = new DbResult();
            dbResult = irolemenu.createOrUpdateRoleMenu(menuAllocation);
            return dbResult;
        }

        [HttpPost("getMenusByRole")]
        [Authorize]
        public List<MenuWrapper> getMenusByRole([FromBody] int id)
        {
            List<MenuWrapper> menuWrappers=new List<MenuWrapper>();
            MenuWrapper menuWrapper = new MenuWrapper();
            List<Menu> menus=new List<Menu>();
            List<Menu> menuItem=new List<Menu>();

            menus=imenu.getMenusByRoleAndType(id,"Menu");

            foreach(var menu in menus)
            {
                menuWrapper=new MenuWrapper();
                menuWrapper.m_id=menu.m_id;
                menuWrapper.m_name=menu.m_name;
                menuWrapper.m_link=menu.m_link;
                menuWrapper.m_type=menu.m_type;
                menuWrapper.m_fa_icon=menu.m_fa_icon;
                menuWrapper.m_parrent=menu.m_parrent;
                menuWrapper.m_parrent_name=menu.m_parrent_name;
                menuWrapper.m_cre_by=menu.m_cre_by;
                menuWrapper.m_cre_by_name=menu.m_cre_by_name;
                menuWrapper.m_cre_date=menu.m_cre_date;
                menuWrapper.m_menu_items = imenu.getMenuItemByRoleAndParrent(id,menu.m_id);
                menuWrappers.Add(menuWrapper);
            }
          

            return menuWrappers;
        }
    }
}
