import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Income } from '../../models/income.model';
import { IuserService } from '../../services/iuser.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { IIncomeService } from '../../services/iincome.service';
import { IMasterDataService } from '../../services/imaster.data.service';
import { RequestParms } from '../../models/requestParms';
import { MasterData } from '../../models/master.data.model';
import { ICategoryService } from '../../services/icategory.service';
import { Category } from '../../models/category.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { SnackBarService } from '../../services/isnackbar.service';
declare var $: any;

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit, OnDestroy {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  incomes: Income[] = [];
  income: Income = new Income();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  categories: Category[] = [];
  private subscription: Subscription = new Subscription();
  paymentTypes: MasterData[] = [];

  requestParms: RequestParms = new RequestParms();
  @ViewChild('incomeGrid') incomeGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private iincomeService: IIncomeService,
    private router: Router,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService, 
    private gridService: GridService,
    private snackBarService:SnackBarService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "i_id" },
    { headerName: "Category", field: "i_category_name" },
    { headerName: "Date", field: "i_income_date" },
    { headerName: "Amount", field: "i_amount" },
    { headerName: "Payment Method", field: "i_payment_method_name" },
    { headerName: "Remarks", field: "i_remarks" },
    { headerName: "Created By", field: "i_cre_by_name" },
    { headerName: "Created On", field: "i_cre_date" },
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
    }
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };
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
        this.snackBarService.showError("Unknown Action "+action);;
    }
  }

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.incomeGrid.api)
  }

  ngOnInit(): void {
    this.loadIncomes();
    this.loadCategories();
    this.subscription.add(
      this.iincomeService.refreshIncomes$.subscribe(() => {
        this.loadIncomes();
       
      })
    );
    this.getMasterDatasByType("PaymentType", (data) => { this.paymentTypes = data; });
    
  }


  onEdit(data:any){
    this.iincomeService.getIncome(data.i_id).subscribe(
      (data: Income) => {
        this.income = data;
        this.setSelect2Values();
        $('#incomeFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching income', error);
      }
    );
  }

  onDelete(data:any){
    this.iincomeService.deleteIncome(data.i_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.incomes = this.incomes.filter(income => income.i_id !== data.i_id);
          this.snackBarService.showError("Successfully Removed");;
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting income', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadIncomes(): void {
    this.iincomeService.getIncomes().subscribe(
      (data: Income[]) => {
        this.incomes = data;
        this.gridService.resizeGridColumns(this.incomeGrid.api)
      },
      (error: any) => {
        console.error('Error fetching incomes', error);
      }
    );
  }


  loadCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
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

  createOrUpdateIncome(): void {
    this.income.i_cre_by = this.currentUser.u_id;
    this.iincomeService.createOrUpdateIncome(this.income).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
            this.iincomeService.refreshIncomes();
            
          $('#incomeFormModal').modal('hide');
          
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating income', error);
        alert('An error occurred while creating/updating the income.');
      }
    );
  }

  deleteIncome(id: number): void {
    this.iincomeService.deleteIncome(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.incomes = this.incomes.filter(income => income.i_id !== id);
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting income', error);
      }
    );
  }

  editIncome(id: number): void {
    this.iincomeService.getIncome(id).subscribe(
      (data: Income) => {
        this.income = data;
        this.setSelect2Values();
        $('#incomeFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching income', error);
      }
    );
  }

  createIncome(): void {
    this.income = new Income();
    $('#incomeFormModal').modal('show');
  }

  onCategoryChange(c_id: any) {
    this.income.i_category = c_id;
  }
  onPaymentTypeChange(paymentType:any) {
    this.income.i_payment_method=paymentType
  }

  setSelect2Values(){
    $("#i_category").val(this.income.i_category).trigger('change');
    $("#i_payment_method").val(this.income.i_payment_method).trigger('change');
  }
}
