import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { Subject, Subscription } from 'rxjs';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { IMenuService } from '../../services/imenu.service';
import { RequestParms } from '../../models/requestParms';
import { MenuType } from '../../models/menuType';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  implements OnInit, OnDestroy{
  menus: Menu[] = [];
  menuTypes: MenuType[]=[];
  menuType:MenuType=new MenuType();
  menu: Menu = new Menu();
  requestParms : RequestParms =new RequestParms();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private iuserService: IuserService, private imenuService: IMenuService,private router: Router) { 

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
    this.loadMenuTypes();
    this.subscription.add(
      this.imenuService.refreshMenus$.subscribe(() => {
        this.getMenusByType(this.menuType);
      })
    );
  }
  loadMenus(): void {
    this.imenuService.getMenus().subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching menus', error);

      }
    );
  }

  loadMenuTypes(): void {
    this.imenuService.getMenuTypes().subscribe(
      (data: MenuType[]) => {
        this.menuTypes = data;
      },
      (error: any) => {
        console.error('Error fetching menu type', error);
        
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getMenusByType(menuType: any){
   
    this.requestParms.type=menuType;
    this.imenuService.getMenusByType(this.requestParms).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.removeDatatable();
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching menus', error);
      }
    );
  }
  openCreateModal(){
    this.menu = new Menu();
    $('#menuFormModal').modal('show');
  }
  createOrUpdateMenu(){
    this.removeDatatable();
    this.menu.m_cre_by = this.currentUser.u_id;
    this.imenuService.createOrUpdateMenu(this.menu).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if(data.message=="Success"){
          this.imenuService.refreshMenus();
          this.dtTrigger.next(null);
          this.closeModal();
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
  closeModal(){
    this.menu=new Menu();
    $('#menuFormModal').modal("hide");
  }

  editMenu(id :number){
    this.imenuService.getMenu(id).subscribe(
      (data: Menu) => {
        this.menu = data;
        $('#menuFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching Menu', error);
      }
    );
  }
  deleteMenu(id: number){
    this.imenuService.deleteMenu(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === 'Success') {
          this.menus = this.menus.filter(menu => menu.m_id !== id);
          this.removeDatatable();
          this.dtTrigger.next(null);
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );
  }
  
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
}
