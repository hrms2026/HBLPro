import { Component,  ElementRef, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../models/role.model';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { Router } from '@angular/router';
import { MenuType } from '../../models/menuType';
import { IMenuService } from '../../services/imenu.service';
import { Menu } from '../../models/menu.model';
import { RequestParms } from '../../models/requestParms';
import { MenuAllocation } from '../../models/menu.allocation.model';
import { Select2Directive } from '../../directives/select2.directive';
declare var $: any;

@Component({
  selector: 'app-menu.allocation',
  templateUrl: './menu.allocation.component.html',
  styleUrl: './menu.allocation.component.css'
})


export class MenuAllocationComponent implements OnInit{
  roles: Role[] = [];
  menus : Menu [] =[];
  menuTypes: MenuType[]=[];
  dbResult: DbResult = new DbResult();
  allMenus:Menu []= [];
  allowedMenus :Menu []=[];
  currentUser: User = new User();
  role :number =0;
  menuType :string ="";
  menuAllocation=new MenuAllocation();
  private subscription: Subscription = new Subscription();
  requestParms : RequestParms =new RequestParms();
  
  
  @ViewChild('multiselectleft') multiselectleft!: ElementRef;
  @ViewChild('multiselectright') multiselectright!: ElementRef;
  @ViewChild('u_role_id') u_role_id!: ElementRef;


  constructor(private iuserService: IuserService, private iroleService: IroleService, private imenuService: IMenuService,private router: Router) {

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
   
  }
  
  ngOnInit(): void {
    this.loadRoles();
    this.loadMenuTypes();
  }
  loadRoles() {
    this.iroleService.getRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }
  loadMenuTypes(): void {
    this.imenuService.getMenuTypes().subscribe(
      (data: MenuType[]) => {
        this.menuTypes = data;
        if (this.menuTypes.length > 0) {
          this.menuType = this.menuTypes[0].menuType;
        }
      },
      (error: any) => {
        console.error('Error fetching menu type', error);
        
      }
    );
  }
  
  getMenusByRoleAndType(_role: any){
    this.role=_role;
    if(_role!=0){
      this.requestParms.id=_role;
      this.requestParms.type=this.menuType;
      this.imenuService.getMenusByType(this.requestParms).subscribe(
        (data: Menu[]) => {
          this.allMenus = data;
          this.requestParms.id=_role;
          this.requestParms.type=this.menuType;
          this.imenuService.getMenusByRoleAndType(this.requestParms).subscribe(
          (data: Menu[]) => {
                this.allowedMenus = data;
                const allowedMenuIds = new Set(this.allowedMenus.map(menu => menu.m_id));
                this.allMenus = this.allMenus.filter(menu => !allowedMenuIds.has(menu.m_id));
          },
          (error: any) => {
            console.error('Error fetching menus', error);
          }
        );
      
      },
      (error: any) => {
        console.error('Error fetching menus', error);
      }
      );
    }
  }
  rightAll(){
    
    this.allowedMenus.push(...this.allMenus);
    this.allMenus = [];
  
  }
  rightSelected(){
    const selectElement = this.multiselectleft.nativeElement;
    const selectedOptions = Array.from(selectElement.selectedOptions) as HTMLOptionElement[];
    const selectedMenuIds = selectedOptions.map(option => parseInt(option.value));
     // Filter selected items from allMenus and add them to allowedMenus
     const selectedMenus = this.allMenus.filter(menu => selectedMenuIds.includes(menu.m_id));
     this.allowedMenus.push(...selectedMenus);
     // Remove selected items from allMenus
     this.allMenus = this.allMenus.filter(menu => !selectedMenuIds.includes(menu.m_id));
  }
  leftSelected(){
    const selectElement = this.multiselectright.nativeElement;
    const selectedOptions = Array.from(selectElement.selectedOptions) as HTMLOptionElement[];
    const selectedMenuIds = selectedOptions.map(option => parseInt(option.value));
    
     // Filter selected items from allMenus and add them to allowedMenus
     const selectedMenus = this.allowedMenus.filter(menu => selectedMenuIds.includes(menu.m_id));
     this.allMenus.push(...selectedMenus);
 
     // Remove selected items from allMenus
     this.allowedMenus = this.allowedMenus.filter(menu => !selectedMenuIds.includes(menu.m_id));
  }
  leftAll(){
    this.allMenus.push(...this.allowedMenus);
    this.allowedMenus = [];
  }
  
  createOrUpdateRoleMenu(){
    this.menuAllocation.role= this.role;
    this.menuAllocation.menuType=this.menuType;
    this.menuAllocation.menuIds=this.allowedMenus.map(menu => menu.m_id).join(',');
    this.menuAllocation.cre_by=this.currentUser.u_id;
      this.imenuService.createOrUpdateRoleMenu(this.menuAllocation).subscribe(
        (data: DbResult) => {
          this.dbResult = data;
          if(data.message=="Success"){
             alert("Successfully Updated !!");
          }else
          {
            alert(data.message);
          }
        },
        (error: any) => {
          console.error('Error fetching users', error);
        }
      );
   
  }
  onOptionChange(newValue: string) {
    this.getMenusByRoleAndType(this.role);
  }
}
