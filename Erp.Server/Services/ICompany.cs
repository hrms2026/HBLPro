using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICompany
    {
        public List<Company> getCompanies();
        Company getCompany(int id);
        DbResult deleteCompany(int id);
        DbResult createOrUpdateCompany(Company company);
    }
}
