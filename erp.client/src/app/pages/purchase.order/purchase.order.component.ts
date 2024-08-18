import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrder } from '../../models/purchase.order.model';
import { DbResult } from '../../models/dbresult.model';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { User } from '../../models/user.model';
import { IpurchaseOrderService } from '../../services/ipurchase.order.service';
import { Subject, Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-purchase.order',
  templateUrl: './purchase.order.component.html',
  styleUrl: './purchase.order.component.css'
})
export class PurchaseOrderComponent  implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  purchaseOrder:PurchaseOrder=new PurchaseOrder();
  dbResult: DbResult=new DbResult();
  currentUser: User = new User();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();
  private subscription: Subscription = new Subscription();
  
  constructor(private iuserService: IuserService, private iroleService: IroleService,
     private elRef: ElementRef, private cdr: ChangeDetectorRef,private router: Router,private ipurchaseOrder: IpurchaseOrderService) {
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
    this.loadPurchaseOrders();
    this.subscription.add(
      this.ipurchaseOrder.refreshPurchaseOrders$.subscribe(() => {
        this.loadPurchaseOrders();
      })
    );
  }

  loadPurchaseOrders() {
    this.ipurchaseOrder.getPurchaseOrders().subscribe(
      (data: PurchaseOrder[]) => {
        this.purchaseOrders = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  createOrUpdatePurchaseOrder() : void {

    this.purchaseOrder.po_cre_by = this.currentUser.u_id;
    this.ipurchaseOrder.createOrUpdatePurchaseOrder(this.purchaseOrder).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if(data.message=="Success"){
          this.ipurchaseOrder.refreshPurchaseOrders();
          this.removeDatatable();
          this.closeModal();
          
        }else
        {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }
  
  deletePurchaseOrder(id:number){
    this.ipurchaseOrder.deletePurchaseOrder(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.purchaseOrders = this.purchaseOrders.filter(po => po.po_id !== id);
          this.ipurchaseOrder.refreshPurchaseOrders();
          this.removeDatatable();
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting role', error);
      }
    );
  }
  editPurchaseOrder(id: number): void {
    this.ipurchaseOrder.getPurchaseOrder(id).subscribe(
      (data: PurchaseOrder) => {
        this.purchaseOrder = data;
        $('#purchaseOrderFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching role', error);
      }
    );
  }
  closeModal(){
    this.purchaseOrder = new PurchaseOrder();
    $('#purchaseOrderFormModal').modal("hide");
  }
  openCreateFormModal(): void {
    this.purchaseOrder = new PurchaseOrder();
    $('#purchaseOrderFormModal').modal('show');
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
