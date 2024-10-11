import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { IuserService } from '../../services/iuser.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ICustomerService } from '../../services/icustomer.service';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  customer: Customer = new Customer();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private iuserService: IuserService, private icustomerService: ICustomerService,private router: Router) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    
  }

  ngOnInit(): void {
    this.dtOptions= {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: '<"row"<"col-sm-6 text-left"l><"col-sm-6 text-right"f>>t<"row"<"col-sm-6"i><"col-sm-6"p>>'
    };
    this.loadCustomers();
    this.subscription.add(
      this.icustomerService.refreshCustomers$.subscribe(() => {
        this.loadCustomers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  loadCustomers(): void {
    this.icustomerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching customers', error);
      }
    );
  }

  createOrUpdateCustomer(): void {
   
    this.customer.c_cre_by = this.currentUser.u_id;
    this.icustomerService.createOrUpdateCustomer(this.customer).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.icustomerService.refreshCustomers();
          this.removeDatatable();
          $('#customerFormModal').modal('hide');
      
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating customer', error);
        alert('An error occurred while creating/updating the customer.');
      }
    );
  }

  deleteCustomer(id: number): void {
    this.icustomerService.deleteCustomer(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.customers = this.customers.filter(customer => customer.c_id !== id);
          this.icustomerService.refreshCustomers();
          this.removeDatatable();
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting customer', error);
      }
    );
  }
  

  editCustomer(id: number): void {
    this.icustomerService.getCustomer(id).subscribe(
      (data: Customer) => {
        this.customer = data;
        $('#customerFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching customer', error);
      }
    );
  }

  createCustomer(): void {
    this.customer = new Customer();
    $('#customerFormModal').modal('show');
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
