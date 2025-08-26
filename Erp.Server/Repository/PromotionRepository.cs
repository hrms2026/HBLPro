using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class PromotionRepository : IPromotion
    {
        private DBContext db;
        public PromotionRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdatePromotion(Promotion promotion)
        {
            var p_id = new SqlParameter("p_id", promotion.p_id + "");
            var p_company_id = new SqlParameter("p_company_id",promotion.p_company_id + "");
            var p_user = new SqlParameter("p_user",promotion.p_user + "");
            var p_designation = new SqlParameter("p_designation",promotion.p_designation + "");
            var p_date = new SqlParameter("p_date",promotion.p_date.ToString("yyyy-MM-dd") + "");
            var p_basic_salary = new SqlParameter("p_basic_salary",promotion.p_basic_salary + "");
            var p_allowance = new SqlParameter("p_allowance",promotion.p_allowance + "");
            var p_cash_part= new SqlParameter("p_cash_part",promotion.p_cash_part+ "");
            var p_current_salary = new SqlParameter("p_current_salary", promotion.p_current_salary + "");
            var p_cre_by = new SqlParameter("p_cre_by",promotion.p_cre_by + "");

          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdatePromotion @p_id,@p_company_id,@p_user,@p_designation,@p_date,@p_basic_salary,@p_allowance,@p_cash_part,@p_current_salary,@p_cre_by;",
                p_id,p_company_id,p_user,p_designation,p_date,p_basic_salary,p_allowance,p_cash_part,p_current_salary,p_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deletePromotion(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deletePromotion @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Promotion getPromotion(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var Promotion = db.Set<Promotion>().FromSqlRaw("EXEC dbo.getPromotion @id;", _id).ToList().FirstOrDefault() ?? new Promotion();
            return Promotion;
        }

        public List<Promotion> getPromotions()
        {
            var Promotions = db.Set<Promotion>().FromSqlRaw("EXEC dbo.getPromotions;").ToList();
            return Promotions;
        } 

       
    }
}
