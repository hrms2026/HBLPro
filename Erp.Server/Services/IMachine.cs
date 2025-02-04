using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IMachine
    {
        public List<Machine> getMachines();
        Machine getMachine(int id);
        DbResult deleteMachine(int id);
        DbResult createOrUpdateMachine(Machine machine);
    }
}
