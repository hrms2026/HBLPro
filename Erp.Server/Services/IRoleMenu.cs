using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IRoleMenu
    {
        DbResult createOrUpdateRoleMenu(MenuAllocation menuAllocation);
     
    }
}
