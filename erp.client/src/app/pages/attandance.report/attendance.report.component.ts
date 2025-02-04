import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { User } from '../../models/user.model';
import { ReportParm } from '../../models/report.parm.model';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/isnackbar.service';
import { GridService } from '../../services/igrid.service';
import { IReportService } from '../../services/ireport.service';
import { DataTableStructure } from '../../methods/datatable.structure';
import { RequestParms } from '../../models/requestParms';

@Component({
  selector: 'app-attendance.report',
  templateUrl: './attendance.report.component.html',
  styleUrl: './attendance.report.component.css'
})
export class AttendanceReportComponent {
  reportParms: ReportParm = new ReportParm();
  users: User[] = [];
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
  requestParms: any;

  constructor(
    private iuserService: IuserService,
    private router: Router,
    private dataTableStructure: DataTableStructure,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private ireportService: IReportService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
  this.getUsers();
  }
  @ViewChild('vatReportGrid') vatReportGrid!: AgGridAngular;
   
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
      this.igridService.resizeGridColumns(this.vatReportGrid.api);
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

  OnUserChange(u_id: number){
    this.reportParms.rp_user=Number(u_id);
  }
  getAttandanceReport() {
    if (this.reportParms.rp_report_type != "") {

      const start = this.dateRangeForm.get('start')?.value;
      const end = this.dateRangeForm.get('end')?.value;
      if (start && end) {
        this.reportParms.rp_date_range = start.toLocaleDateString('en-CA') + "," + end.toLocaleDateString('en-CA');
      }
      this.ireportService.getAttandanceReport(this.reportParms).subscribe(
        (data: any[]) => {

          this.colDefs = this.dataTableStructure.getDatatableStructure(data);
          this.reportdata = data;
          setTimeout(() => {
          this.igridService.resizeGridColumns(this.vatReportGrid.api);
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
