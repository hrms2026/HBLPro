import { Component, ViewChild } from '@angular/core';
import { IuserService } from '../../services/iuser.service';
import { ISupplierService } from '../../services/isupplier.service';
import { IDepartmentService } from '../../services/idepartment.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Department } from '../../models/department.model';
import { DbResult } from '../../models/dbresult.model';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { GridService } from '../../services/igrid.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
declare var $: any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  departments :Department []=[];
  department :Department=new Department();
  currentUser: User = new User();
  dbResult: DbResult=new DbResult ();
    
 private subscription: Subscription = new Subscription();


  @ViewChild('departmentGrid') departmentGrid!: AgGridAngular;

  constructor(private iuserService: IuserService, private idepartmentService: IDepartmentService,private router: Router, private gridService: GridService,) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    this.getDepartments()
  }

ngOnInit(): void {
    this.getDepartments();
    this.subscription.add(
      this.idepartmentService.refreshDepartments$.subscribe(() => {
        this.getDepartments();
      })
    );
  }

colDefs: ColDef[] = [
    { headerName: "Id", field: "d_id" },
    { headerName: "Name", field: "d_name" },
    { headerName: "short name", field: "d_sname" },
    { headerName: "Department code", field: "d_code" },
    { headerName: "Created By", field: "d_cre_by_name" },
    { headerName: "Created On", field: "d_cre_date" },
    
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
    this.idepartmentService.getDepartment(data.d_id).subscribe(
      (data:Department) => {
        this.department = data;
        $('DepartmentModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching department', error);
      }
    );
  }

  onDelete(data:any){
    this.idepartmentService.deleteDepartment(data.d_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.departments = this.departments.filter(d => d.d_id !== data.d_id);
          this.departmentGrid.api.applyTransaction({});
          this.idepartmentService.refreshDepartments();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting department', error);
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.departmentGrid.api)
  }
  
  
  



  createDepartment(){
   this.department = new Department();
    this.department.d_code = this.generateDepartmentCode();
       $('#DepartmentModal').modal('show');
  }

  generateDepartmentCode(): string {
  const prefix = 'DEPT';
  const randomNumber = Math.floor(100 + Math.random() * 900); // 3-digit random number
  return `${prefix}${randomNumber}`;
}


  getDepartments(){
    this.idepartmentService.getDepartments().subscribe(
          (data: Department[]) => {
            this.departments = data;
            this.departmentGrid.api.applyTransaction({});
           
          },
          (error: any) => {
            console.error('Error fetching departments', error);
          }
        );
    
  }

 createOrUpdateDepartment(): void {
   
    this.department.d_cre_by = this.currentUser.u_id;
    this.idepartmentService.createOrUpdateDepartment(this.department).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.idepartmentService.refreshDepartments();
          $('DepartmentModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
       
      }
    );
  }

editDepartment(d_id :number): void {

}
}
