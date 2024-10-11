import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Supplier } from '../../models/supplier.model';
import { IuserService } from '../../services/iuser.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ISupplierService } from '../../services/isupplier.service';
declare var $: any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit, OnDestroy {
  suppliers: Supplier[] = [];
  supplier: Supplier = new Supplier();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private iuserService: IuserService, private isupplierService: ISupplierService,private router: Router) { 

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
    this.loadSuppliers();
    this.subscription.add(
      this.isupplierService.refreshSuppliers$.subscribe(() => {
        this.loadSuppliers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  loadSuppliers(): void {
    this.isupplierService.getSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching suppliers', error);
      }
    );
  }

  createOrUpdateSupplier(): void {
   
    this.supplier.s_cre_by = this.currentUser.u_id;
    this.isupplierService.createOrUpdateSupplier(this.supplier).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.isupplierService.refreshSuppliers();
          this.removeDatatable();
          $('#supplierFormModal').modal('hide');
      
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating supplier', error);
        alert('An error occurred while creating/updating the supplier.');
      }
    );
  }

  deleteSupplier(id: number): void {
    this.isupplierService.deleteSupplier(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.suppliers = this.suppliers.filter(supplier => supplier.s_id !== id);
          this.isupplierService.refreshSuppliers();
          this.removeDatatable();
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting supplier', error);
      }
    );
  }
  

  editSupplier(id: number): void {
    this.isupplierService.getSupplier(id).subscribe(
      (data: Supplier) => {
        this.supplier = data;
        $('#supplierFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching supplier', error);
      }
    );
  }

  createSupplier(): void {
    this.supplier = new Supplier();
    $('#supplierFormModal').modal('show');
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}

