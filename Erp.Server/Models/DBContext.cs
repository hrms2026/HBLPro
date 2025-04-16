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
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MasterData> MasterDatas { get; set; }
        public DbSet<MasterType> MasterTypes { get; set; }
        public DbSet<Designation> Designation { get; set; }
        public DbSet<Company> companies { get; set; }
        public DbSet<ReleaseDocument> releasedocuments { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Machine> Machines { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<LeaveApprovalHistory> LeaveApprovalHistory { get; set; }
        public DbSet<HolidaySchedule> HolidaySchedules { get; set; }


    }

}
