import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { GridService } from '../../services/igrid.service';
import { Company } from '../../models/company.model';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { Promotion } from '../../models/promotion.model';
import { IPromotionService } from '../../services/ipromotion.service';
import { ICompanyService } from '../../services/icompany.service';
import { format } from 'date-fns';
import { Designation } from '../../models/desigation.model';
import { IDesignationService } from '../../services/idesignation.service';
import { DbResult } from '../../models/dbresult.model';
import { IMasterDataService } from '../../services/imaster.data.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {

  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  currentUser: User = new User();
  companies: Company[] = [];
  promotions: Promotion[] = [];
  promotion: Promotion = new Promotion();
  users: User[] = []; 
  user: User=new User();
  designations: Designation[] = [];

  @ViewChild('promotionGrid') promotionGrid!: AgGridAngular;
  subscription: any;



  constructor(private iuserService: IuserService, private router: Router, private gridService: GridService, private iPromotionService: IPromotionService, private icompanyService: ICompanyService, private idesignationService: IDesignationService,
    private imasterDataService: IMasterDataService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }
  ngOnInit(): void {
    this.getCompanies();
    this.getUsers();
    this.getDesignations();
    this.getPromotions();
    this.subscription.add(
      this.iPromotionService.refreshPromotions$.subscribe(() => {
        this.getPromotions();
      })
    );
  }

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.promotionGrid.api);
  }

  colDefs: ColDef[] = [
    { headerName: "user", field: "p_user_name" },
    { headerName: "Company", field: "p_company_name" },
    { headerName: "Designation", field: "p_designation_name" },
    { headerName: "Basic salary", field: "p_basic_salary" },
    { headerName: "Allowance", field: "p_allowance" },
    { headerName: "Cash part", field: "p_cash_part" },
    { headerName: "current salary", field: "p_current_salary" },
    {
      headerName: "Date", field: "p_date", valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd');
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
    {
      headerName: "Create Date",
      field: "p_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
      },
    },
    { headerName: "created by", field: "p_cre_by_name" },
  ];

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
      default:
        ;
    }
  }

  getCompanies() {
    this.icompanyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;

      },
      (error: any) => {
        console.error('Error fetching companies', error);
      }
    );
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

 
   

  
  getDesignations() {
    this.idesignationService.getDesignations().subscribe(
      (data: Designation[]) => {
        this.designations = data;


      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }

  onCompanyNameChange(p_company_id: number) {
    this.promotion.p_company_id = p_company_id;
  }

  onUserChange(p_user: number) {
    this.iuserService.getUser(Number(p_user)).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
    this.promotion.p_user = p_user;
  }

  onDesignationChange(p_designation: number) {
    this.promotion.p_designation = p_designation;
  }


  onEdit(data: any) {
    this.iPromotionService.getPromotion(data.p_id).subscribe(
      (data: Promotion) => {
        this.promotion = data;
        $('#promotionModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching holidayschedule', error);
      }
    );
  }
  onDelete(data: any) {
    this.iPromotionService.deletePromotion(data.hs_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.promotions = this.promotions.filter(p => p.p_company_id !== data.p_company_id);
          this.promotionGrid.api.applyTransaction({});
          this.iPromotionService.refreshPromotions();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting holidayschedules', error);
      }
    );
  }
  getPromotions() {
    this.iPromotionService.getPromotions().subscribe(
      (data: Promotion[]) => {
        this.promotions = data;
        this.promotionGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }
  CreatePromotion() {
    this.promotion = new Promotion();
    $('#promotionModal').modal('show');

  }
  createOrUpdatePromotion(): void {

    this.promotion.p_cre_by = this.currentUser.u_id;
    this.iPromotionService.createOrUpdatePromotion(this.promotion).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.iPromotionService.refreshPromotions();
          $('#PromotionModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );
  }




}


