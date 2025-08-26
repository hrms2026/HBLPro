import { Component, ViewChild } from '@angular/core';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { GridService } from '../../services/igrid.service';
import { IIncentiveService } from '../../services/iincentive.service';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { format, formatDate } from 'date-fns';
import { Incentive } from '../../models/incentive.model';
import { MasterData } from '../../models/master.data.model';
import { DbResult } from '../../models/dbresult.model';
import { RequestParms } from '../../models/requestParms';
import { FormControl, FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrl: './incentive.component.css'
})
export class IncentiveComponent {

  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';

  incentives: Incentive[] = [];
  currentUser: User = new User();
  incentive: Incentive = new Incentive();
  selectedMonth: string = '';
  users: User[] = [];
  user: User = new User();
  Paymenttype: MasterData[] = [];
  requestParms = new RequestParms();
  i_month: string = '';
  monthFilter:string='';



  private subscription: Subscription = new Subscription();

  @ViewChild('incentiveGrid') incentiveGrid!: AgGridAngular;


  constructor(private iuserService: IuserService, private router: Router, private gridService: GridService, private iincentiveService: IIncentiveService,
    private imasterDataService: IMasterDataService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }
  ngOnInit(): void {

    this.getUsers();
    this.monthFilter = this.formatMonth(new Date());
    this.getIncentives();
    this.subscription.add(
      this.iincentiveService.refreshIncentives$.subscribe(() => {
        this.getIncentives();
      })
    );
    this.getMasterDatasByType("PaymentType", (data) => { this.Paymenttype = data; });
  }

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.incentiveGrid.api);
  }
  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);  // Pass the data to the callback function
      },
      (error: any) => {
        console.error('Error fetching master data', error);
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }


  colDefs: ColDef[] = [
    { headerName: "id", field: "i_id" },
    { headerName: "Name", field: "i_user_name" },
    { headerName: "month", field: "i_month_name" },
    { headerName: "Amount", field: "i_amount" },
    { headerName: "Payment Type", field: "i_payment_type_name" },
    { headerName: "Reason", field: "i_reason" },
    {
      headerName: 'Edit', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Edit', action: 'onEdit', cssClass: 'btn btn-info', icon: 'fa fa-edit', onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Delete', action: 'onDelete', cssClass: 'btn btn-danger', icon: 'fa fa-trash', onDelete: (data: any) => this.onAction('delete', data)
      },
    },
    { headerName: "created by", field: "i_cre_by_name" },
    {
      headerName: "Create Date",
      field: "i_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
      },
    },

  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };


  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      default:
        ;
    }
  }
  onEdit(data: any) {
    this.iincentiveService.getIncentive(data.i_id).subscribe(
      (data: Incentive) => {
        this.incentive = data;
        $('#incentiveModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching incentive', error);
      }
    );
  }
  onDelete(data: any) {
    this.iincentiveService.deleteIncentive(data.i_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.incentives = this.incentives.filter(i => i.i_id !== data.i_id);
          this.incentiveGrid.api.applyTransaction({});
          this.iincentiveService.refreshIncentives();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting incentives', error);
      }
    );
  }

  getUsers() {

    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );

  }


  getcurrentUser(): number {
    return this.currentUser.u_id;
  }
  getIncentives() {
    this.requestParms = new RequestParms();
    this.requestParms.month=this.monthFilter;
    this.iincentiveService.getIncentives(this.requestParms).subscribe(
      (data: Incentive[]) => {
        this.incentives = data;
        this.incentiveGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }
  CreateIncentive() {
    this.incentive = new Incentive();
    $('#incentiveModal').modal('show');

  }
  createOrUpdateIncentive(): void {
    if (!this.incentive) {
      alert('Please enter incentive value.');
      return;
    }
    this.incentive.i_cre_by = this.currentUser.u_id;
    this.iincentiveService.createOrUpdateIncentive(this.incentive).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.iincentiveService.refreshIncentives();
          $('#incentiveModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );
  }

  OnPaymentTypeChange(i_payment_type: number) {
    this.incentive.i_payment_type = i_payment_type;
  }
  OnUserChange(u_id: number) {
    this.incentive.i_user = u_id;
  }



  // On month picker change
  onMonthChange() {
    this.getIncentives() 
  }

  // Format as 'YYYY-MM'
  private formatMonth(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return  `${year}-${month}`; 
  }

}