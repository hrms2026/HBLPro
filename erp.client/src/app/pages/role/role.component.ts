import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Role } from '../../models/role.model';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'] // Corrected from styleUrl to styleUrls
})
export class RoleComponent implements OnInit, OnDestroy {
  roles: Role[] = [];
  role: Role = new Role();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private iuserService: IuserService, private iroleService: IroleService,private router: Router) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
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
    this.loadRoles();
    this.subscription.add(
      this.iroleService.refreshRoles$.subscribe(() => {
        this.loadRoles();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  loadRoles(): void {
    this.iroleService.getRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }

  createOrUpdateRole(): void {
   
    this.role.r_cre_by = this.currentUser.u_id;
    this.iroleService.createOrUpdateRole(this.role).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.iroleService.refreshRoles();
          this.removeDatatable();
          $('#roleFormModal').modal('hide');
      
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating role', error);
        alert('An error occurred while creating/updating the role.');
      }
    );
  }

  deleteRole(id: number): void {
    this.iroleService.deleteRole(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.roles = this.roles.filter(role => role.r_id !== id);
          this.iroleService.refreshRoles();
          this.removeDatatable();
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting role', error);
      }
    );
  }
  

  editRole(id: number): void {
    this.iroleService.getRole(id).subscribe(
      (data: Role) => {
        this.role = data;
        $('#roleFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching role', error);
      }
    );
  }

  createRole(): void {
    this.role = new Role();
    $('#roleFormModal').modal('show');
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
