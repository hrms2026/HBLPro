using Erp.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<DbResult> DbResult { get; set; }
        public DbSet<MenuType> MenuTypes { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
      
    }

}
