using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class MachineRepository : IMachine
    {
        private DBContext db;
        public MachineRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateMachine(Machine machine)
        {
            var m_id = new SqlParameter("m_id", machine.m_id + "");
            var m_name = new SqlParameter("m_name",machine.m_name + "");
            var m_port = new SqlParameter("m_port", machine.m_port + "");
            var m_ip_address = new SqlParameter("m_ip_address", machine.m_ip_address + "");
            var m_type = new SqlParameter("m_type", machine.m_type + "");
            var m_cre_by = new SqlParameter("m_cre_by", machine.m_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateMachine @m_id,@m_name,@m_port,@m_ip_address,@m_type,@m_cre_by;",
                m_id, m_name,m_port,m_ip_address,m_type,m_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteMachine(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteMachine @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Machine getMachine(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var machine = db.Set<Machine>().FromSqlRaw("EXEC dbo.getMachine @id;", _id).ToList().FirstOrDefault() ?? new Machine();
            return machine;
        }

        public List<Machine> getMachines()
        {
            var machines = db.Set<Machine>().FromSqlRaw("EXEC dbo.getMachines;").ToList();
            return machines;
        } 

       
    }
}

