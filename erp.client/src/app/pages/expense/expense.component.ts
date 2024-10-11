import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Expense } from '../../models/expense.model';
import { IuserService } from '../../services/iuser.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { IExpenseService } from '../../services/iexpense.service';
import { Category } from '../../models/category.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { SnackBarService } from '../../services/isnackbar.service';
import { ICategoryService } from '../../services/icategory.service';
import { IMasterDataService } from '../../services/imaster.data.service';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
declare var $: any;

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'] // Fix typo from styleUrl to styleUrls
})
export class ExpenseComponent implements OnInit, OnDestroy {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  expenses: Expense[] = [];
  expense: Expense = new Expense();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  categories: Category[] = [];
  subscription: Subscription = new Subscription();
  paymentTypes: MasterData[] = [];
  requestParms: RequestParms = new RequestParms();
  @ViewChild('expenseGrid') expenseGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private iexpenseService: IExpenseService,
    private icategoryService: ICategoryService,
    private router: Router,
    private imasterDataService: IMasterDataService,
    private gridService: GridService,
    private snackBarService:SnackBarService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "e_id" },
    { headerName: "Category", field: "e_category_name" },
    { headerName: "Date", field: "e_expense_date" },
    { headerName: "Amount", field: "e_amount" },
    { headerName: "Payment Method", field: "e_payment_method_name" },
    { headerName: "Remarks", field: "e_remarks" },
    { headerName: "Created By", field: "e_cre_by_name" },
    { headerName: "Created On", field: "e_cre_date" },
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
    this.gridService.resizeGridColumns(this.expenseGrid.api)
  }

  onEdit(data:any){
    this.iexpenseService.getExpense(data.e_id).subscribe(
      (data: Expense) => {
        this.expense = data;
        this.setSelect2Values();
        $('#expenseFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching expense', error);
      }
    );
  }

  onDelete(data:any){
    this.iexpenseService.deleteExpense(data.e_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.expenses = this.expenses.filter(expense => expense.e_id !== data.e_id);
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting expense', error);
      }
    );
  }

  ngOnInit(): void {

    this.loadExpenses();
    this.loadCategories();
    this.subscription.add(
      this.iexpenseService.refreshExpenses$.subscribe(() => {
        this.loadExpenses();
      })
    );
    this.getMasterDatasByType("PaymentType", (data) => { this.paymentTypes = data; });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  loadExpenses(): void {
    this.iexpenseService.getExpenses().subscribe(
      (data: Expense[]) => {
        this.expenses = data;
        
      },
      (error: any) => {
        console.error('Error fetching expenses', error);
      }
    );
  }

  createOrUpdateExpense(): void {
    this.expense.e_cre_by = this.currentUser.u_id;
    this.iexpenseService.createOrUpdateExpense(this.expense).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          $('#expenseFormModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating expense', error);
        alert('An error occurred while creating/updating the expense.');
      }
    );
  }

  createExpense(): void {
    this.expense = new Expense();
    $('#expenseFormModal').modal('show');
  }


  onCategoryChange(c_id: any) {
    this.expense.e_category = c_id;
  }
  onPaymentTypeChange(paymentType: any) {
    this.expense.e_payment_method = paymentType
  }
  setSelect2Values(){
    $("#e_category").val(this.expense.e_category).trigger('change');
    $("#e_payment_method").val(this.expense.e_payment_method).trigger('change');
  }
}
