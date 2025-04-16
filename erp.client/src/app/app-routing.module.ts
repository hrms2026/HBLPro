import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleComponent } from './pages/role/role.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PurchaseOrderComponent } from './pages/purchase.order/purchase.order.component';
import { MenuAllocationComponent } from './pages/menu.allocation/menu.allocation.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DesignationComponent } from './pages/designation/designation.component';
import { CompanyComponent } from './pages/company/company.component';
import { ReleaseDocumentComponent } from './pages/release.document/release.document.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { MachineComponent } from './pages/machine/machine.component';
import { AttendanceReportComponent } from './pages/attandance.report/attendance.report.component';
import { LeaveRequestComponent } from './pages/leaverequest/leaverequest.component';
import { LeaveapprovalComponent } from './pages/leaveapproval/leaveapproval.component';
import { SalarygenerationComponent } from './pages/salarygeneration/salarygeneration.component';
import { HolidayScheduleComponent } from './pages/holiday.schedule/holiday.schedule.component';


const routes: Routes = [
  // Redirect empty path to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Define your login route
  {  
    path: 'login',
    component: LoginComponent
  },
  { path: 'logout', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component : UsersComponent
      },
      {
        path: 'roles',
        component : RoleComponent
      },
      {
        path: 'purchaseOrder',
        component : PurchaseOrderComponent
      },
      {
        path: 'menus',
        component : MenuComponent
      },
      {
        path: 'menuallocation',
        component : MenuAllocationComponent
      },
      {
        path: 'customers',
        component : CustomerComponent
      },
      {
        path : 'suppliers',
        component : SupplierComponent
      },
      {
        path : 'incomes',
        component : IncomeComponent
      },
      {
        path : 'expenses',
        component : ExpenseComponent
      },
      {
        path :'master-data',
        component :MasterDataComponent
      },
      {
        path :'department',
        component :DepartmentComponent
      },
      {
        path :'designation',
        component :DesignationComponent
      },
      {
        path :'company',
        component :CompanyComponent
      },
      {
        path :'release-document',
        component :ReleaseDocumentComponent
      },
      {
        path :'attendance',
        component :AttendanceComponent
      },

     {
        path :'machines',
        component : MachineComponent
      },
      {
        path :'attendance-report',
        component : AttendanceReportComponent
      },
      {
        path :'leave-request',
        component : LeaveRequestComponent
      },
      {
        path :'leave-approval',
        component : LeaveapprovalComponent
      },
      {
        path :'salary-generation',
        component : SalarygenerationComponent
      },
      {
        path :'holiday-schedule',
        component : HolidayScheduleComponent
      }
      
      


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

