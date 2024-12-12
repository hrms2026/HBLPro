import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { Subject, Subscription } from 'rxjs';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { IMenuService } from '../../services/imenu.service';
import { RequestParms } from '../../models/requestParms';
import { MenuType } from '../../models/menuType';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {
  pagination = true;
  paginationPageSize15 = 15;
  paginationPageSizeSelector15 = [15, 30, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  menus: Menu[] = [];
  menuTypes: MenuType[] = [];
  menuType: MenuType = new MenuType();
  menu: Menu = new Menu();
  requestParms: RequestParms = new RequestParms();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  selectedMenuType: string = '';
  private subscription: Subscription = new Subscription();
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  parrentmenus: Menu[] = [];
  @ViewChild('menuGrid') menuGrid!: AgGridAngular;


  constructor(private iuserService: IuserService, private imenuService: IMenuService, private router: Router) {

    this.currentUser = iuserService.getCurrentUser();

    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }

  colDefs: ColDef[] = [
    { headerName: "Id", width: 100, field: "m_id" },
    { headerName: "Name", field: "m_name" },
    { headerName: "Link", field: "m_link" },
    { headerName: "Fa Icon", field: "m_fa_icon" },
    { headerName: "Parrent", field: "m_parrent_name" },
    { headerName: "Type", field: "m_type" },
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
    { headerName: "Created By", field: "m_cre_by_name" },
    { headerName: "Created On", field: "m_cre_date" },
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };
  defaultColDef = {
    sortable: true,
    filter: true
  };

  ngOnInit(): void {
    this.loadMenuTypes();
    this.subscription.add(
      this.imenuService.refreshMenus$.subscribe(() => {
        this.getMenusByType(this.selectedMenuType);
      })
    );

   
  }
  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  onGridReady(event: GridReadyEvent) {
    this.menuGrid.api.sizeColumnsToFit();
  }

  onEdit(data: any) {
    this.getParrentMenusByType();
    this.imenuService.getMenu(data.m_id).subscribe(
      (data: Menu) => {
        this.menu = data;
        setTimeout(() => {
          $("#m_parrent").select2().val(data.m_parrent).trigger('change');
        }, 100);
        $('#menuFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching Menu', error);
      }
    );
  }

  onDelete(data: any) {
    this.imenuService.deleteMenu(data.m_id).subscribe(
      (result: DbResult) => {
        if (result.message === 'Success') {
          this.menus = this.menus.filter(menu => menu.m_id !== data.m_id);
          this.menuGrid.api.applyTransaction({});
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );
  }
  
  loadMenus(): void {
    this.imenuService.getMenus().subscribe(
      (data: Menu[]) => {
        this.menus = data;
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

  getParrentMenusByType() {
    if (this.selectedMenuType == 'MenuItem') {
      this.requestParms.type = "Menu";
      this.imenuService.getMenusByType(this.requestParms).subscribe(
        (data: Menu[]) => {
          this.parrentmenus = data;
        },
        (error: any) => {
          console.error('Error fetching menus', error);
        }
      );
    }
    else {
      this.parrentmenus = [];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getMenusByType(menuType: any) {
    this.selectedMenuType = menuType;
    this.requestParms.type = menuType;
    this.imenuService.getMenusByType(this.requestParms).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.menuGrid.api.addEventListener('modelUpdated', () => {
          this.menuGrid.api.sizeColumnsToFit();
        });
      },
      (error: any) => {
        console.error('Error fetching menus', error);
      }
    );
  }
  openCreateModal() {
    this.menu = new Menu();
    this.menu.m_type = this.selectedMenuType
    this.getParrentMenusByType();
    $('#menuFormModal').modal('show');
  }
  createOrUpdateMenu() {
    if (this.menu.m_name != "" && this.menu.m_type != "") {
      this.menu.m_cre_by = this.currentUser.u_id;
      this.imenuService.createOrUpdateMenu(this.menu).subscribe(
        (data: DbResult) => {
          this.dbResult = data;
          if (data.message == "Success") {
            this.imenuService.refreshMenus();
            this.closeModal();
          } else {
            alert(data.message);
          }
        },
        (error: any) => {
          console.error('Error fetching users', error);
        }
      );
    }else{
      alert("Please Enter All the Data !!");
    }
  }
  closeModal() {
    this.menu = new Menu();
    $('#menuFormModal').modal("hide");
  }
  OnParrentChange(m_parrent:any){
    this.menu.m_parrent=m_parrent;
  }
}
