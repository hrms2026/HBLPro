using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class CompanyRepository : ICompany
    {
        private DBContext db;
        public CompanyRepository (DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateCompany(Company company)
        {
            var c_id = new SqlParameter("c_id", company.c_id + "");
            var c_name = new SqlParameter("c_name", company.c_name + "");
            var c_type = new SqlParameter("c_type", company.c_type + "");
            var c_sname = new SqlParameter("c_sname", company.c_sname + "");
            var c_address = new SqlParameter("c_address", company.c_address + "");
            var c_country = new SqlParameter("c_country", company.c_country + "");
            var c_phone = new SqlParameter("c_phone", company.c_phone + "");
            var c_post_box= new SqlParameter("c_post_box", company.c_post_box+ "");
            var c_fax = new SqlParameter("c_fax", company.c_fax + "");
            var c_mail = new SqlParameter("c_mail", company.c_mail + "");
            var c_website = new SqlParameter("c_website", company.c_website + "");
            var c_cre_by = new SqlParameter("c_cre_by", company.c_cre_by + "");

          
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateCompany @c_id,@c_name, @c_type,@c_sname,@c_address,@c_country,@c_phone,@c_post_box,@c_fax,@c_mail,@c_website,@c_cre_by;",
                c_id, c_name,c_type,c_sname,c_address,c_country,c_phone,c_post_box, c_fax,c_mail, c_website,c_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteCompany(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteCompany @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Company getCompany(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var Company = db.Set<Company>().FromSqlRaw("EXEC dbo.getCompany @id;", _id).ToList().FirstOrDefault() ?? new Company();
            return Company;
        }

        public List<Company> getCompanies()
        {
            var Companies = db.Set<Company>().FromSqlRaw("EXEC dbo.getCompanies;").ToList();
            return Companies;
        } 

       
    }
}
