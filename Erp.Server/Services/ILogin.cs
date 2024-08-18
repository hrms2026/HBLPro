using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ILogin
    {
        DbResult getlogin(string username, string password);
       
    }
}
