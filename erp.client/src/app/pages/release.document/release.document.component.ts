import { Component, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DbResult } from '../../models/dbresult.model';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestParms } from '../../models/requestParms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AgGridAngular } from 'ag-grid-angular';
import { GridService } from '../../services/igrid.service';
import { Router } from '@angular/router';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IuserService } from '../../services/iuser.service';
import { IReleaseDocumentService } from '../../services/irelease.document.service';
import { ReleaseDocument } from '../../models/release.document.model';
import { User } from '../../models/user.model';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { format } from 'date-fns';


declare var $: any;

@Component({
  selector: 'app-release.document',
  providers: [provideNativeDateAdapter()],
  templateUrl: './release.document.component.html',
  styleUrl: './release.document.component.css'
})
export class ReleaseDocumentComponent implements OnInit {

  users: User[] = [];
  user: User = new User();
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100]
  releasedocuments: ReleaseDocument[] = [];
  filteredReleaseDocuments: ReleaseDocument[] = [];
  showReceiveReport: boolean = false; // This tracks whether the toggle is on or off
  startDate: string = '';  // Start date for filtering
  dateRangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  releasedocument: ReleaseDocument = new ReleaseDocument();
  dbResult: DbResult = new DbResult();
  removeDatatable: any;
  requestParms = new RequestParms();
  private subscription: Subscription = new Subscription();
  @ViewChild('releaseDocumentGrid') releaseDocumentGrid!: AgGridAngular;
  documentGrid: any;
  releaseDocument: ReleaseDocument = new ReleaseDocument();
  
  currentUser: User = new User();
  reason: string = '';
  isEditing: boolean = false;
  router: any;

  constructor(private iuserService: IuserService, private iReleaseDocumentService: IReleaseDocumentService) {
    this.currentUser = iuserService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getreleasedocuments();
    this.getUsers();

  }
  deleteReleaseDocument() {
    throw new Error('Method not implemented.');
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

  colDefs: ColDef[] = [

    { headerName: "Id", width: 100, field: "rd_id" },
    { headerName: "Employee", field: "rd_emp_name" },
    { headerName: "Passport No", field: "rd_passport_no" },
    { headerName: "Released To", field: "rd_released_name" },
    { headerName: "Reason", field: "rd_reason" },
    {
      headerName: 'Receieve', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Receive', action: 'onReceive', cssClass: 'btn btn-success', icon: 'fa fa-check circle', onReceive: (data: any) => this.onAction('Receive', data)
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

    { headerName: "Created By", field: "rd_cre_by_name" },
    {
      headerName: "Create Date",
      field: "rd_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
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
      case 'Receive':
        this.onReceive(data);
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }
  onReceive(data: any) {
    this.requestParms=new RequestParms();
    this.requestParms.id=data.rd_id;
    this.requestParms.user=this.currentUser.u_id;

    this.iReleaseDocumentService.receiveReleaseDocument(this.requestParms).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {

          this.releasedocuments = this.releasedocuments.filter(m => m.rd_id !== data.rd_id);

          this.releaseDocumentGrid.api.applyTransaction({});

          this.iReleaseDocumentService.refreshReleaseDocument();
          alert("Successfully Received");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error ', error);
      }
    )

  }

  onGridReady(event: GridReadyEvent) {

  }

  onEdit(data: any) {
    
    this.iReleaseDocumentService.getReleaseDocument(data.rd_id).subscribe(
      (data: ReleaseDocument) => {
        this.releasedocument = data;
        this.setSelect2Fields();
        this.isEditing = true;
        this.reason=data.rd_reason;
        $('#documentModal').modal('show');
       
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );

  }

  onDelete(data: any) {
    this.iReleaseDocumentService.deleteReleaseDocument(data.rd_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.releasedocuments = this.releasedocuments.filter(m => m.rd_id !== data.rd_id);
          this.releaseDocumentGrid.api.applyTransaction({});
          this.iReleaseDocumentService.refreshReleaseDocument();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    )
  }


  ReleaseDocument() {
    
    this.releaseDocument=new ReleaseDocument();
    this.setSelect2Fields();
    this.reason='';
    $("#documentModal").modal("show");
  }

  OnEmployeeChange(u_id: number) {
    this.iuserService.getUser(Number(u_id)).subscribe(
      (data: User) => {
        this.user = data;
        this.releaseDocument.rd_emp_id = data.u_id;
        this.releaseDocument.rd_passport_no = data.u_passport_no;

      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }
  onReleaseToChange(u_id: number) {
    this.releaseDocument.rd_released_to = u_id;
  }
  getreleasedocuments() {
    this.requestParms=new RequestParms();

    const start = this.dateRangeForm.get('start')?.value;
    const end = this.dateRangeForm.get('end')?.value;

    if (start && end) {
      this.requestParms.daterange = start.toLocaleDateString('en-CA') + "," + end.toLocaleDateString('en-CA');
    }
    this.requestParms.flag= this.showReceiveReport+'';
    this.iReleaseDocumentService.getReleaseDocuments(this.requestParms).subscribe(
      (data: ReleaseDocument[]) => {
        this.releasedocuments = data;
        
        
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }

  toggleReceiveReport(){
    this.getreleasedocuments();
  }
 
  onDateChange(){
    this.getreleasedocuments();
  }


  createOrUpdateReleaseDocument() {
    if (this.releasedocument.rd_emp_id != 0)
      this.releaseDocument.rd_reason = this.reason.toString();
    this.releaseDocument.rd_cre_by = this.currentUser.u_id;
    this.iReleaseDocumentService.createOrUpdateReleaseDocument(this.releaseDocument).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message == "Success") {
          this.releaseDocumentGrid.api.applyTransaction({});
          this.getreleasedocuments();
          $('#documentModal').modal('hide');
        } else {
          alert(data.message);
        }
      }

    );

  }
  setSelect2Fields() {
    $("#rd_emp-id").select2().val(this.releasedocument.rd_emp_id).trigger("change");
    $("#rd_released_to").select2().val(this.releasedocument.rd_released_to).trigger("change");

  }

  onDateSelected(date:any){

  }
  
}


