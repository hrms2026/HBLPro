import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { Role } from '../../models/role.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Select2Directive } from '../../directives/select2.directive';
import { AgGridAngular } from 'ag-grid-angular';
import { GridService } from '../../services/igrid.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100]
  users: User[] = [];
  user: User = new User();
  roles: Role[] = [];
  dbResult: DbResult = new DbResult();
  currentUser: User = new User();
  role: any = 0;
  removeDatatable: any;
  private subscription: Subscription = new Subscription();
  @ViewChild('userGrid') userGrid!: AgGridAngular;


  constructor(private IuserService: IuserService,private iroleService:IroleService, private gridService: GridService, private iuserService: IuserService, private router: Router) {
    {
      this.currentUser = iuserService.getCurrentUser();
      if (this.currentUser.u_id == 0) {
        this.router.navigate(['login']);
      }
    }
  }
  ngOnInit(): void {
    this.getUsers();
    this.loadRoles();
    this.subscription.add(
      this.iuserService.refreshUsers$.subscribe(() => {
        this.getUsers();
      })
    );
  }
  getUsers() {
    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.userGrid.api.applyTransaction({});
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );

  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "u_id" },
    { headerName: "Name", field: "u_name" },
    { headerName: "Username", field: "u_username" },
    { headerName: "password", field: "u_password" },
    { headerName: "email", field: "u_email" },
    { headerName: "role id", field: "u_role_id" },
    { headerName: "role name", field: "u_role_name" },
    { headerName: "is admin", field: "u_is_admin" },
    { headerName: "active yn", field: "u_active_yn" },
    { headerName: "mother name", field: "u_m_name" },
    { headerName: "father name", field: "u_fname" },
    { headerName: "passport no", field: "u_passport_no" },
    { headerName: "contact person", field: "u_contact_person" },
    { headerName: "nationality", field: "u_nationality" },
    { headerName: "date of birth", field: "u_date_of_birth" },
    { headerName: "gender", field: "u_gender" },
    { headerName: "address", field: "u_address" },
    { headerName: "emp code", field: "u_emp_code" },
    { headerName: "file no", field: "u_file_no" },
    { headerName: "date of join", field: "u_date_of_join" },
    { headerName: "Created By", field: "u_cre_by" },
    { headerName: "Created By name", field: "u_cre_by_name" },
    { headerName: "created date", field: "u_cre_date" },
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
  onDelete(data: any) {
    this.iuserService.deleteUser(data.u_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.users = this.users.filter(u => u.u_id !== data.u_id);
          this.userGrid.api.applyTransaction({});
          this.iuserService.refreshUsers();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );



  }

  onEdit(data: any) {
    this.iuserService.getUser(data.u_id).subscribe(
      (data: User) => {
        this.user = data;
        $('#usersModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }


  loadUsers() {
    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadRoles() {
    this.iroleService.getRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }


  createOrUpdateUser(): void {
    this.user.u_cre_by = this.currentUser.u_id;
    this.user.u_role_id = this.role;
    this.iuserService.createOrUpdateUser(this.user).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message == "Success") {
          this.iuserService.refreshUsers();
          this.removeDatatable();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating user', error);
      }
    );
  }
  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.userGrid.api)
  }
  createUser(): void {
    this.user = new User();
    $('#usersModal').modal('show');
  }

  OnRoleChange(u_role_id:number){
    this.user.u_role_id=u_role_id;
  }
}
