import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IuserService } from '../../services/iuser.service';
import { User } from '../../models/user.model';
import { IDesignationService } from '../../services/idesignation.service';
import { Designation } from '../../models/desigation.model';
import { DbResult } from '../../models/dbresult.model';
import { Subject, Subscription } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { AgGridAngular } from 'ag-grid-angular';
declare var $: any;

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  designations :Designation []=[];
  designation :Designation=new Designation();
  currentUser: User = new User();
  dbResult: DbResult=new DbResult ();
  removeDatatable: any;
  private subscription: Subscription = new Subscription();

  @ViewChild('designationGrid') designationGrid!: AgGridAngular;

  constructor(private iuserService: IuserService,  private gridService: GridService,private idesignationService: IDesignationService,private router: Router) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    
  }


  colDefs: ColDef[] = [
    { headerName: "Id", field: "ds_id" },
    { headerName: "Name", field: "ds_name" },
    { headerName: "Created By", field: "ds_cre_by_name" },
    { headerName: "Created On", field: "ds_cre_date" },
    
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
      default:
       ;
    }
  }


  onEdit(data:any){
    this.idesignationService.getDesignation(data.ds_id).subscribe(
      (data:Designation) => {
        this.designation = data;
        $('#DesignationFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }

  onDelete(data:any){
    this.idesignationService.deleteDesignation(data.ds_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.designations = this.designations.filter(ds => ds.ds_id !== data.ds_id);
          this.designationGrid.api.applyTransaction({});
          this.idesignationService.refreshDesignations();
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

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.designationGrid.api)
  }
  
  ngOnInit(): void {
    this.getDesignations();
    this.subscription.add(
      this.idesignationService.refreshDesignations$.subscribe(() => {
        this.getDesignations();
      })
    );
  }


  createDesignation(): void {
    this.designation = new Designation();
    $('#DesignationFormModal').modal('show');
  }
 

  getDesignations(){
    this.idesignationService.getDesignations().subscribe(
      (data: Designation[]) => {
        this.designations = data;
        this.designationGrid.api.applyTransaction({});
       
      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }
  createOrUpdateDesignation(): void {
   
    this.designation.ds_cre_by = this.currentUser.u_id;
    this.idesignationService.createOrUpdateDesignation(this.designation).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.idesignationService.refreshDesignations();
          $('#DesignationFormModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
       
      }
    );
  }


  editDesignation(ds_id :number): void {
    

  }
}










