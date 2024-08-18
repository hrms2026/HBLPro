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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

