namespace Erp.Server.Services
{
    public interface IJwtAuthManager
    {
        string GenerateToken(string username);
    }
}
