using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly ILogger<ExpenseController> logger;
        private readonly IUser iuser;
        private readonly IExpense iexpense;

        public ExpenseController(ILogger<ExpenseController> _logger,IUser _iuser,IExpense _iexpense)
        {
            logger = _logger;
            iuser = _iuser;
            iexpense = _iexpense;

        }
        [HttpPost("getExpenses")]
        [Authorize]
        public List<Expense> getExpenses()
        {
            List<Expense> expenses =new List<Expense>();
            expenses = iexpense.getExpenses();
            return expenses;
        }
        [HttpPost("deleteExpense")]
        [Authorize]
        public DbResult deleteExpense([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iexpense.deleteExpense(id);
            return dbResult;
        }

        [HttpPost("getExpense")]
        [Authorize]
        public Expense getExpense([FromBody] int id)
        {
            Expense expense = new Expense();
            expense = iexpense.getExpense(id);
            return expense;
        }
        [HttpPost("createOrUpdateExpense")]
        [Authorize]
        public DbResult createOrUpdateExpense([FromBody] Expense expense)
        {
            DbResult dbResult = new DbResult();
            dbResult = iexpense.createOrUpdateExpense(expense);
            return dbResult;
        }


    }
}
