using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IRole
    {
        DbResult createOrUpdateRole(Role role);
        DbResult deleteRole(int id);
        Role getRole(int id);
        public IEnumerable<Role> getRoles();
    }
}
