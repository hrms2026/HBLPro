import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule if using reactive forms
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
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
import { RoleComponent } from './pages/role/role.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { environment } from '../environments/environment';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuAllocationComponent } from './pages/menu.allocation/menu.allocation.component';
import { PurchaseOrderComponent } from './pages/purchase.order/purchase.order.component';
import { Select2Directive } from './directives/select2.directive';
import { DataTablesModule } from 'angular-datatables';
import { CustomerComponent } from './pages/customer/customer.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { IncomeComponent } from './pages/income/income.component';
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentComponent } from './pages/department/department.component';
import { DesignationComponent } from './pages/designation/designation.component';
import { CompanyComponent } from './pages/company/company.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core'; 
import { ReleaseDocumentComponent } from './pages/release.document/release.document.component';

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
    ExpenseComponent,
    IncomeComponent,
    MasterDataComponent,
    DepartmentComponent,
    DesignationComponent,
    CompanyComponent,
    ReleaseDocumentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  // Import ReactiveFormsModule if needed
    AppRoutingModule,
    JwtModule.forRoot(jwtConfig),
    DataTablesModule,
    AgGridModule,
    MatSnackBarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,  // Added MatNativeDateModule for Material date pickers
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter, // Optional: Custom date adapter if needed
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }