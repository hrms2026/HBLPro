using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IDepartment
    {
        public List<Department> getDepartments();
        Department getDepartment(int id);
        DbResult deleteDepartment(int id);
        DbResult createOrUpdateDepartment(Department department);
    }
}
