import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { Role } from '../../models/role.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Select2Directive } from '../../directives/select2.directive';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User = new User();
  roles: Role[] = [];
  dbResult: DbResult = new DbResult();
  currentUser: User = new User();
  role : any=0;
  dtOptions: any ={};
  private subscription: Subscription = new Subscription();
  dtTrigger:Subject<any>=new Subject<any>();
  
  
  constructor(private iuserService: IuserService, private iroleService: IroleService, private elRef: ElementRef, private cdr: ChangeDetectorRef, private router: Router) {
    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id == 0) { 
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.dtOptions= {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: '<"row"<"col-sm-6 text-left"l><"col-sm-6 text-right"f>>t<"row"<"col-sm-6"i><"col-sm-6"p>>'
    };
    this.loadUsers();
    this.subscription.add(
      this.iuserService.refreshUsers$.subscribe(() => {
        this.loadUsers();
      })
    );
    this.loadRoles();
  }

  loadUsers() {
    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dtTrigger.next(null);
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
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }

  deleteUser(id: number) {
    this.iuserService.deleteUser(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === 'Success') {
          this.users = this.users.filter(user => user.u_id !== id);
          this.iuserService.refreshUsers();
          this.removeDatatable();
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );
  }

  getUser(id: number): void {
    this.iuserService.getUser(id).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }

  createOrUpdateUser(): void {
    this.user.u_cre_by = this.currentUser.u_id;
    this.user.u_role_id = this.role;
    this.iuserService.createOrUpdateUser(this.user).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if(data.message == "Success") {
          this.iuserService.refreshUsers();
          this.removeDatatable();
          this.closeModal();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating user', error);
      }
    );
  }

  editUser(id: number): void {
    this.iuserService.getUser(id).subscribe(
      (data: User) => {
        this.user = data;
        $('#userFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }

  createUser(): void {
    this.user = new User();
    $('#userFormModal').modal('show');
  }

  closeModal() {
    this.user = new User();
    $('#userFormModal').modal("hide");
  }
  OnRoleChange(r_id:any ){

    this.role=r_id;
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
