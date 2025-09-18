import { Component, ViewChild } from '@angular/core';
import { ReportParm } from '../../models/report.parm.model';
import { User } from '../../models/user.model';
import { Company } from '../../models/company.model';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { DataTableStructure } from '../../methods/datatable.structure';
import { SnackBarService } from '../../services/isnackbar.service';
import { GridService } from '../../services/igrid.service';
import { ICompanyService } from '../../services/icompany.service';
import { IReportIncentiveService } from '../../services/ireportIncentive.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionRendererComponent } from '../../directives/action.renderer';

@Component({
  selector: 'app-incentivereport',
  templateUrl: './incentivereport.component.html',
  styleUrl: './incentivereport.component.css'
})
export class IncentivereportComponent {
  reportParms: ReportParm = new ReportParm();
  users: User[] = [];
  companies: Company[] = [];
  currentUser: User = new User();
  reportdata: any[] = [];
  pagination = true;
  paginationPageSize15 = 15;
  paginationPageSizeSelector15 = [15, 30, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
 
  

  constructor(
    private iuserService: IuserService,
    private router: Router,
    private dataTableStructure: DataTableStructure,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private ireportloanService: IReportIncentiveService,
    private icompanyService: ICompanyService,
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
  this.getUsers();
  this.getCompanies();
  }
  @ViewChild('matReportGrid') matReportGrid!: AgGridAngular;
   
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
    setTimeout(() => {
      this.igridService.resizeGridColumns(this.matReportGrid.api);
    }, 500);
  }
  OnReportTypeChange(reporttype: any) {
    this.reportParms.rp_report_type = reporttype
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

  getCompanies() {
    this.icompanyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;

      },
      (error: any) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  OnUserChange(u_id: number){
    this.reportParms.rp_user=Number(u_id);
  }

   OnCompanyChange(c_id: number){
    this.reportParms.rp_company_id=Number(c_id);
  }
  getIncentiveReport() {
    if (this.reportParms.rp_report_type != "") {
      const start = this.dateRangeForm.get('start')?.value;
      const end = this.dateRangeForm.get('end')?.value;
      if (start && end) {
        this.reportParms.rp_date_range = start.toLocaleDateString('en-CA') + "," + end.toLocaleDateString('en-CA');
      }
      this.ireportloanService.getIncentiveReport(this.reportParms).subscribe(
        (data: any[]) => {
          this.colDefs = this.dataTableStructure.getDatatableStructure(data);
          this.reportdata = data;
          setTimeout(() => {
          this.igridService.resizeGridColumns(this.matReportGrid.api);
           }, 100);
        },
        (error: any) => {
          if (error.status !== 401) {
           
          }
        }
      );
    }
    else {
      this.snackBarService.showError("Please Select Report Type");

    }
  }


}







