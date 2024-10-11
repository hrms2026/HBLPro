using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly ILogger<IncomeController> logger;
        private readonly IUser iuser;
        private readonly IIncome iincome;

        public IncomeController(ILogger<IncomeController> _logger, IUser _iuser, IIncome _iincome)
        {
            logger = _logger;
            iuser = _iuser;
            iincome = _iincome;
        }

        [HttpPost("getIncomes")]
        [Authorize]
        public List<Income> getIncomes()
        {
            List<Income> incomes = new List<Income>();
            incomes = iincome.getIncomes();
            return incomes;
        }

        [HttpPost("deleteIncome")]
        [Authorize]
        public DbResult deleteIncome([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iincome.deleteIncome(id);
            return dbResult;
        }

        [HttpPost("getIncome")]
        [Authorize]
        public Income getIncome([FromBody] int id)
        {
            Income income = new Income();
            income = iincome.getIncome(id);
            return income;
        }

        [HttpPost("createOrUpdateIncome")]
        [Authorize]
        public DbResult createOrUpdateIncome([FromBody] Income income)
        {
            DbResult dbResult = new DbResult();
            dbResult = iincome.createOrUpdateIncome(income);
            return dbResult;
        }
    }

}
