import { Component, ViewChild } from '@angular/core';
import { Company } from '../../models/company.model';
import { IHolidayScheduleService } from '../../services/iholiday.schedule.service';
import { ICompanyService } from '../../services/icompany.service';
import { HolidaySchedule } from '../../models/holiday.schedule.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { DbResult } from '../../models/dbresult.model';
import { formatDate } from '@angular/common';
import { User } from '../../models/user.model';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { Alert } from 'bootstrap';
declare var $: any;
@Component({
  selector: 'app-holiday.schedule',
  templateUrl: './holiday.schedule.component.html',
  styleUrl: './holiday.schedule.component.css'
})
export class HolidayScheduleComponent {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  companies: Company[] = [];
  holidayschedules: HolidaySchedule[] = [];
  currentUser: User = new User();
  holidayschedule: HolidaySchedule = new HolidaySchedule();

  @ViewChild('holidayGrid') holidayGrid!: AgGridAngular;
  subscription: any;

  constructor(private iuserService: IuserService,private iHolidayScheduleService: IHolidayScheduleService, private icompanyService:
     ICompanyService, private gridService: GridService,private router: Router
  ) {

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    
  }

  ngOnInit(): void {
    this.getHolidaySchedules();
    this.getCompanies();
    this.getHolidaySchedules();

    this.subscription.add(
      this.iHolidayScheduleService.refreshHolidaySchedules$.subscribe(() => {
        this.getHolidaySchedules();
      })
    );
    
  }

  colDefs: ColDef[] = [
    { headerName: "Company", field: "hs_company_id" },
    { headerName: "Reason", field: "hs_reason" },
    { 
      headerName: "Leave from", field: "hs_leave_from",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd');
     },
    },

    { headerName: "Leave to", field: "hs_leave_to", valueFormatter: (params) => {
      return format(new Date(params.value), 'yyyy-MM-dd');
     },
    },
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
    {
      headerName: "Create Date",
            field: "hs_cre_date",
            valueFormatter: (params) => {
              return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
            },
    },
    { headerName: "created by", field: "hs_cre_by_name" },
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };


  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.holidayGrid.api);
  }

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
    this.iHolidayScheduleService.getHolidaySchedule(data.hs_id).subscribe(
      (data: HolidaySchedule) => {
        this.holidayschedule = data;
        $('#holidayscheduleModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching holidayschedule', error);
      }
    );
  }


  onDelete(data: any) {
    this.iHolidayScheduleService.deleteHolidaySchedule(data.hs_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.holidayschedules = this.holidayschedules.filter(hs => hs.hs_company_id !== data.hs_company_id);
          this.holidayGrid.api.applyTransaction({});
          this.iHolidayScheduleService.refreshHolidaySchedules();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting holidayschedules', error);
      }
    );
  }

  OnCompanyNameChange(hs_company_id: number) {
    this.holidayschedule.hs_company_id = hs_company_id;
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

  createHoliday() {
    this.holidayschedule = new HolidaySchedule();
    this.select2change();
    $('#holidayscheduleModal').modal('show');
  }

   getHolidaySchedules(){
       this.iHolidayScheduleService.getHolidaySchedules().subscribe(
         (data: HolidaySchedule[]) => {
           this.holidayschedules = data;
           this.holidayGrid.api.applyTransaction({});
          
         },
         (error: any) => {
           console.error('Error fetching designation', error);
         }
       );
     }

  createOrUpdateHolidaySchedule() {
    this.holidayschedule.hs_leave_from = formatDate(this.holidayschedule.hs_leave_from, 'yyyy-MM-dd', 'en-US');      
    this.holidayschedule.hs_leave_to = formatDate(this.holidayschedule.hs_leave_to, 'yyyy-MM-dd', 'en-US');
    this.holidayschedule.hs_cre_by=this.currentUser.u_id;
    this.iHolidayScheduleService.createOrUpdateHolidaySchedule(this.holidayschedule).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.iHolidayScheduleService.refreshHolidaySchedules();
          $('#holidayscheduleModal').modal('hide');
          this.select2change();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );
  }


  calculateLeaveDays() {
    const from = new Date(this.holidayschedule.hs_leave_from);
    const to = new Date(this.holidayschedule.hs_leave_to);
  
    if (from && to && !isNaN(from.getTime()) && !isNaN(to.getTime())) {
      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
      this.holidayschedule.hs_leave_days = diffDays > 0 ? diffDays : 0;
    } else {
      this.holidayschedule.hs_leave_days = 0;
    }
  }
  
  

  

  select2change(){
    $("#hs_company_id").select2().val(this.holidayschedule.hs_company_id).trigger("change");
  }
}


