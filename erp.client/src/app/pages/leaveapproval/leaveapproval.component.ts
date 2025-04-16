import { Component, ViewChild } from '@angular/core';
import { LeaveRequest } from '../../models/leave.request.model';
import { User } from '../../models/user.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { ILeaveRequestService } from '../../services/ileave.request.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/isnackbar.service';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { DbResult } from '../../models/dbresult.model';
import { LeaveApprovalHistory } from '../../models/leaveapprovalhistory.model';
declare var $: any;
@Component({
  selector: 'app-leaveapproval',
  templateUrl: './leaveapproval.component.html',
  styleUrl: './leaveapproval.component.css'
})
export class LeaveapprovalComponent {

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
  leaveApprovalHistories: any[] = []; 


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
    this.subscription.unsubscribe();
    

    this.getLeaveRequestsForApprovals();
    
    this.getUsers();
    this.getMasterDatasByType("leavetype", (data) => { this.leavetype = data; });
    this.getMasterDatasByType("Department", (data) => { this.departments = data; });
    this.getMasterDatasByType("Designation", (data) => { this.designations = data; });
    
  }
  getLeaveRequestsForApprovals() {
    this.requestParms=new RequestParms();
    this.requestParms.id=1;
    this.ileaverequestService.getLeaveRequestsForApprovals(this.requestParms).subscribe(
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
    { headerName: "Leave From", field: "lr_leave_from" },
    { headerName: "Leave To", field: "lr_leave_to" },
    { headerName: "Leave Days", field: "lr_leave_days" },
    { headerName: "Contact Number1", field: "lr_contact_details" },
    { headerName: "Contact Number2", field: "lr_phone" },
    { headerName: "Address", field: "lr_address" },
    { headerName: "Remarks", field: "lr_reason" },
    {
      headerName: 'ApproveHistory', cellRenderer: 'actionRenderer', cellRendererParams:
        {
          name: 'ApproveHistory', action: 'onApproveHistory', cssClass: 'btn btn-success', icon: 'fa fa-check', onApproveHistory: (data: any) => this.onAction('approvehistory', data)
        },
      },
      {
      headerName: 'Approve', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Approve', action: 'onApprove', cssClass: 'btn btn-success', icon: 'fa fa-check circle',
        onApprove: (data: any) => this.onAction('approve', data)
      },
    },
    {
      headerName: 'Reject', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Reject', action: 'onReject', cssClass: 'btn btn-danger', icon: 'fa fa-close circle',
        onReject: (data: any) => this.onAction('reject', data)
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
      case 'reject':
        this.onReject(data);
        break;
      case 'approve':
        this.onApprove(data);
        break;
        ;
    case 'approvehistory':
          this.onApproveHistory(data);
          break;
          default:
          ;
     }

  }
  onApproveHistory(data:any){
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

  LeaveRequest() {
    this.leaverequest = new LeaveRequest();
    $('#leaverequestModal').modal('show');
  }

  onGridReady(event: GridReadyEvent) {
  }

  onApprove(data: any) {
    this.requestParms=new RequestParms();

    this.requestParms.id=data.lr_id;
    this.requestParms.user=this.currentUser.u_id;

    this.ileaverequestService.approveLeaveRequest(this.requestParms).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.leaverequests = this.leaverequests.filter(lr => lr.lr_id !== data.lr_id);
          this.leaverequestGrid.api.applyTransaction({remove: [data] });
          alert("Successfully Approved");
          this.ileaverequestService.refreshLeaveRequests();
          
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error ', error);
      }
    )

  }
  onReject(data: any) {
    this.requestParms=new RequestParms();
    this.requestParms.id=data.lr_id;
    this.requestParms.user=this.currentUser.u_id;
    this.ileaverequestService.rejectLeaveRequest(this.requestParms).subscribe(
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


  OnReasonChange(lr_leave_type: number) {
    this.leaverequest.lr_leave_type = lr_leave_type
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


 
    






  
}
