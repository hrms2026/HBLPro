using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IDesignation
    {
        public List<Designation> getDesignations();
        Designation getDesignation(int id);
        DbResult deleteDesignation(int id);
        DbResult createOrUpdateDesignation(Designation designation);
    }
}
