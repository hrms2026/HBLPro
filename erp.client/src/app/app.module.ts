import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'; // Ensure correct import
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { TopnavComponent } from './pages/layout/topnav/topnav.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleComponent } from './pages/role/role.component';// Adjust import path as necessary
import { AuthInterceptor } from './services/auth.interceptor';
import { environment } from '../environments/environment';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuAllocationComponent } from './pages/menu.allocation/menu.allocation.component';
import { PurchaseOrderComponent } from './pages/purchase.order/purchase.order.component';
import { Select2Directive } from './directives/select2.directive';
import { DataTablesModule} from 'angular-datatables';
import { CustomerComponent } from './pages/customer/customer.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { CategoryComponent } from './pages/category/category.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { IncomeComponent } from './pages/income/income.component'
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { AgGridModule } from 'ag-grid-angular'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';

// Define a function to get the token
export function tokenGetter() {
  return localStorage.getItem('token');
}

// Define the JWT configuration statically
const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: [environment.serverHostAddress.replace(/^https?:\/\//, '')],
    disallowedRoutes: [`${environment.serverHostAddress}/auth/`],
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    TopnavComponent,
    FooterComponent,
    HeaderComponent,
    UsersComponent,
    RoleComponent,
    MenuComponent,
    PurchaseOrderComponent,
    MenuAllocationComponent,
    Select2Directive,
    CustomerComponent,
    SupplierComponent,
    CategoryComponent,
    ExpenseComponent,
    IncomeComponent,
    MasterDataComponent,
    ExpenseReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    JwtModule.forRoot(jwtConfig), 
    DataTablesModule,
    AgGridModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
