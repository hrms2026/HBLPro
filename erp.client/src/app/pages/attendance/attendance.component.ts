import { Component, ViewChild } from '@angular/core';
import { Attendance } from '../../models/Attendance.model';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { CompanyComponent } from '../company/company.component';
import { User } from '../../models/user.model';
import { IuserService } from '../../services/iuser.service';
import { IAttendanceService } from '../../services/iattendance.service';
import { DbResult } from '../../models/dbresult.model';
import { RequestParms } from '../../models/requestParms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-attendance',
  providers: [provideNativeDateAdapter()],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100]
  attendances: Attendance[] = [];
  attendance: Attendance = new Attendance();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  users: User[] = [];
  user: User = new User();
  private subscription: Subscription = new Subscription();
  @ViewChild('attendanceGrid') attendanceGrid!: AgGridAngular;
  requestParms = new RequestParms();
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private iuserService: IuserService, private iattendanceService: IAttendanceService) {
    this.currentUser = iuserService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getUsers;
    this.getAttendances();
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "att_id" },
    { headerName: "Employee", field: "att_emp_name" },
    {
      headerName: "PunchTime",
      field: "att_punch_time",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
      },
    },
    { headerName: "PunchType", field: "att_punch_type" },
    { headerName: "Machine", field: "att_machine_name" },
    {
      headerName: "Create Date",
      field: "att_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
      },
    }
  ]

  defaultColDef = {
    sortable: true,
    filter: true
  };
  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  onGridReady(event: GridReadyEvent) {

  }
  punchAttendance() {
    this.iattendanceService.punchAttendance(this.currentUser.u_id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message == "Success")
          alert("Attendance punched successfully!");
        this.getAttendances(); // Refresh attendance list
      },
      (error: any) => {
        console.error('Error punching attendance', error);

      }
    );
  }

  getAttendances() {
    this.requestParms = new RequestParms();

    const start = this.dateRangeForm.get('start')?.value;
    const end = this.dateRangeForm.get('end')?.value;

    if (start && end) {
      this.requestParms.daterange = start.toLocaleDateString('en-CA') + "," + end.toLocaleDateString('en-CA');
    }
    this.requestParms.user = this.currentUser.u_id;

    this.iattendanceService.getAttendances(this.requestParms).subscribe(
      (data: Attendance[]) => {
        this.attendances = data;
        this.attendanceGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching attendances', error);
      }
    );
  }
  getcurrentUser(): number {
    return this.currentUser.u_id;
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

  onDateChange() {

    this.getAttendances();
  }


}
