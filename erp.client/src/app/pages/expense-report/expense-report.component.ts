import { Component, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RequestParms } from '../../models/requestParms';
import { ExpenseReportParm } from '../../models/expense.report.parms.model';
import { Router } from '@angular/router';
import { DataTableStructure } from '../../methods/datatable.structure';
import { AgGridAngular } from 'ag-grid-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterData } from '../../models/master.data.model';
import { User } from '../../models/user.model';
import { IuserService } from '../../services/iuser.service';
import { IExpenseService } from '../../services/iexpense.service';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ICategoryService } from '../../services/icategory.service';
import { Category } from '../../models/category.model';
import { GridService } from '../../services/igrid.service';
import { IExpenseReportService } from '../../services/iexpense.report.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent implements OnInit {
  requestParms: RequestParms = new RequestParms();
  expenseReportParms: ExpenseReportParm = new ExpenseReportParm();
  currentUser: User = new User();
  processors: MasterData[] = [];
  reportdata: any[] = [];
  paymentTypes: MasterData[] = [];
  categories: Category[] = [];
  paginationPageSizeSelector = [15, 30, 50, 100];
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  @ViewChild('expenseReportGrid') expenseReportGrid!: AgGridAngular;
  constructor(
    private iuserService: IuserService,
    private iexpenseReport: IExpenseReportService,
    private icategoryService: ICategoryService,
    private router: Router,
    private imasterDataService: IMasterDataService,
    private dataTableStructure: DataTableStructure,
    private gridService: GridService,

  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    this.loadCategories();
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
  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };
  defaultColDef = {
    sortable: true,
    filter: true
  };

  colDefs: ColDef[] = [
  ];


  onGridReady(event: GridReadyEvent) {
    this.expenseReportGrid.api.sizeColumnsToFit();
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
 
  OnReportTypeChange(reporttype: any) {
    this.expenseReportParms.erp_report_type = reporttype
  }
  getExpenseReport() {
    if (this.expenseReportParms.erp_report_type != "") {
      if (this.expenseReportParms.erp_category != null) {
        const start = this.dateRangeForm.get('start')?.value;
        const end = this.dateRangeForm.get('end')?.value;
        if (start && end) {
          this.expenseReportParms.erp_date_range = start.toISOString().split('T')[0] + "," + end.toISOString().split('T')[0];
        }
        this.iexpenseReport.getExpenseReport(this.expenseReportParms).subscribe(
          (data: any[]) => {

            this.colDefs = this.dataTableStructure.getDatatableStructure(data);
            this.reportdata = data;
            this.gridService.resizeGridColumns(this.expenseReportGrid.api)
           
          },
          (error: any) => {
            console.error('Error fetching sales Report', error.message);
          }
        );
      }
    }
    else
    {
        alert("Please Select Report Type");
    }
  }
}
