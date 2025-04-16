using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ISalarygeneration
    {
        DbResult CreateOrUpdateSalarygeneration(Salarygeneration salarygeneration);
       
        DbResult deleteSalarygeneration(int id);
        Salarygeneration getSalarygeneration(int id);
        List<Salarygeneration> getSalarygenerations();

        DbResult generateSalary(int id);
    }
}
