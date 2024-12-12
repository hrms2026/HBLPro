import { Component } from '@angular/core';
import { IuserService } from '../../services/iuser.service';
import { ISupplierService } from '../../services/isupplier.service';
import { IDepartmentService } from '../../services/idepartment.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  currentUser: User = new User();

  constructor(private iuserService: IuserService, private idepartmentService: IDepartmentService,private router: Router) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    this.getDepartments()
  }
  createDepartment(){
   
  }

  getDepartments(){
    this.idepartmentService.getDepartments();
  }
}
