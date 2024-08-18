using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IUser
    {
        DbResult createOrUpdateUser(User user);
        DbResult deleteUser(int id);
        User getUser(int id);
        User getUserByUsername(string username);
        public IEnumerable<User> getUsers();
    }
}
