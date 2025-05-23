import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { LeaveRequest } from '../../models/leave.request.model';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IuserService } from '../../services/iuser.service';
import { ILeaveRequestService } from '../../services/ileave.request.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/isnackbar.service';
import { MasterData } from '../../models/master.data.model';
import { IMasterDataService } from '../../services/imaster.data.service';
import { RequestParms } from '../../models/requestParms';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { DbResult } from '../../models/dbresult.model';
import { LeaveApprovalHistory } from '../../models/leaveapprovalhistory.model';
import { format } from 'date-fns';
declare var $: any;

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrl: './leaverequest.component.css'
})
export class LeaveRequestComponent {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100]
  leaverequests: LeaveRequest[] = [];
  leaverequest: LeaveRequest = new LeaveRequest();
  users: User[] = [];
  user: User = new User();
  currentUser: User = new User();
  leavetype: MasterData[] = [];
  departments: MasterData[] = [];
  designations: MasterData[] = [];
  leaveApprovalHistories:LeaveApprovalHistory[] = [];
  
  requestParms = new RequestParms();
  private subscription: Subscription = new Subscription();

  @ViewChild('leaverequestGrid') leaverequestGrid!: AgGridAngular;
  @ViewChild('approvalHistoryGrid') approvalHistoryGrid!: AgGridAngular;
  
 

  constructor(private iuserService: IuserService, private ileaverequestService: ILeaveRequestService, private router: Router, private snackBarService: SnackBarService,
    private imasterDataService: IMasterDataService) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }


  ngOnInit(): void {
    
    this.getLeaveRequests();
    this.subscription.add(
      this.ileaverequestService.refreshLeaveRequests$.subscribe(() => {
        this.getLeaveRequests();
      })
    );
    this.getUsers();
    this.getMasterDatasByType("LeaveType", (data) => { this.leavetype = data; });
    this.getMasterDatasByType("Department", (data) => { this.departments = data; });
    this.getMasterDatasByType("Designation", (data) => { this.designations = data; });
  }
  getLeaveRequests() {
    this.ileaverequestService.getLeaveRequests().subscribe(
      (data: LeaveRequest[]) => {
        this.leaverequests = data;
        this.leaverequestGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching leaverequest', error);
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

  colDefs: ColDef[] = [
    { headerName: "Id", field: "lr_id" },
    { headerName: "Leave for", field: "lr_user_name" },
    { headerName: "Department", field: "lr_department_name" },
    { headerName: "Designation", field: "lr_designation_name" },
    { headerName: "Leave Type", field: "lr_leave_type_name" },
    { headerName: "Leave From", field: "lr_leave_from", valueFormatter: (params) => {
          return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
         }, },
    { headerName: "Leave To", field: "lr_leave_to",valueFormatter: (params) => {
      return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
     },},
    { headerName: "Leave Days", field: "lr_leave_days" },
    { headerName: "Contact Number1", field: "lr_contact_details" },
    { headerName: "Contact Number2", field: "lr_phone" },
    { headerName: "Address", field: "lr_address" },
    { headerName: "Remarks", field: "lr_reason" },
    { headerName: "Status", field: "lr_status" },
    { headerName: "Created By", field: "lr_cre_by_name" },
    { headerName: "Created On", field: "lr_cre_date",valueFormatter: (params) => {
      return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
     }, },
    {

      headerName: 'ApproveHistory', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'ApproveHistory', action: 'onApproveHistory', cssClass: 'btn btn-success', icon: 'fa fa-check', onApproveHistory: (data: any) => this.onAction('approvehistory', data)
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
    }
    
  ]
  apcolDefs: ColDef[] = [
    { headerName: "Id", field: "lh_id" },
    { headerName: "Leave Request Id", field: "lh_lr_id" },
    { headerName: "Status", field: "lh_status_name" },
    { headerName: "Created By", field: "lh_cre_by_name" },
    { headerName: "Created Date", field: "lh_cre_date" }
  ]

  defaultColDef = {
    sortable: true,
    filter: true
  };

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };
  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
        ;
        case 'approvehistory':
          this.onApproveHistory(data);
          break;
          default:
          ;

    }

  }
  onApproveHistory(data:any) {
    
    this.ileaverequestService.getApprovalHistory(data.lr_id).subscribe(
      (data: LeaveApprovalHistory[]) => {
        this.leaveApprovalHistories = data;
        this.leaverequestGrid.api.applyTransaction({});
        $('#approvehistoryModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching leaverequest', error);
      }
    
    );
    
  }
  

  openModal(data: any) {
    $('#approvehistoryModal').modal('show');
   
  }
  
  onEdit(data: any) {
    this.ileaverequestService.getLeaveRequest(data.lr_id).subscribe(
      (data: LeaveRequest) => {
        this.leaverequest = data;
        $('#leaverequestModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching leaverequest', error);
      }
    );
  }

  onDelete(data: any) {
    this.ileaverequestService.deleteLeaveRequest(data.lr_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.leaverequests = this.leaverequests.filter(lr => lr.lr_id !== data.lr_id);
          this.leaverequestGrid.api.applyTransaction({});
          this.ileaverequestService.refreshLeaveRequests();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting designation', error);
      }
    );
  }
 


  LeaveRequest() {
    this.leaverequest = new LeaveRequest();
    $('#leaverequestModal').modal('show');
  }

  onGridReady(event: GridReadyEvent) {
  }

  OnReasonChange(lr_reason_type: number) {
    this.leaverequest.lr_leave_type = lr_reason_type
  }

  OnDepartmentChange(lr_department: number) {
    this.leaverequest.lr_department = lr_department
  }
  OnDesignationChange(lr_designation: number) {
    this.leaverequest.lr_designation = lr_designation
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


  createorupdateLeaveRequest() {
    this.leaverequest.lr_cre_by = this.currentUser.u_id;
    this.ileaverequestService.createOrUpdateLeaveRequest(this.leaverequest).subscribe(
      (data: DbResult) => {

        if (data.message == "Success") {
          this.leaverequest = new LeaveRequest();
          this.ileaverequestService.refreshLeaveRequests();
          $('#leaverequestModal').modal('hide');


          this.snackBarService.showSuccess("Leave request submitted successfully.");
        } else {
          this.snackBarService.showError(data.message || "Failed to submit request.");
        }
      },
      (error: any) => {
        this.snackBarService.showError("Failed to process leave request.");
      }
    );






  }









}
