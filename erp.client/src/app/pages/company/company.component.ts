import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../models/company.model';
import { User } from '../../models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { GridService } from '../../services/igrid.service';
import { Router } from '@angular/router';
import { DbResult } from '../../models/dbresult.model';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICompanyService } from '../../services/icompany.service';
declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  companies: Company[] = [];
  company: Company = new Company();
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  removeDatatable: any;
  private subscription: Subscription = new Subscription();

  @ViewChild('companyGrid') companyGrid!: AgGridAngular;

  constructor(private iuserService: IuserService, private gridService: GridService, private icompanyService: ICompanyService, private router: Router) {

    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }
  ngOnInit(): void {
    this.getCompanies();
    this.subscription.add(
      this.icompanyService.refreshCompany$.subscribe(() => {
        this.getCompanies();
      })
    );
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "c_id" },
    { headerName: "Name", field: "c_name" },
    { headerName: "Sname", field: "c_sname" },
    { headerName: "Type", field: "c_type" },
    { headerName: "Country", field: "c_country" },
    { headerName: "Address", field: "c_address" },
    { headerName: "Post Box", field: "c_post_box" },
    { headerName: "Phone", field: "c_phone" },
    { headerName: "Fax", field: "c_fax" },
    { headerName: "Mail", field: "c_mail" },
    { headerName: "Website", field: "c_website" },
    { headerName: "Created By", field: "c_cre_by_name" },
    { headerName: "Created On", field: "c_cre_date" },
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


  onEdit(data: any) {
    this.icompanyService.getCompany(data.c_id).subscribe(
      (data: Company) => {
        this.company = data;
        $('#companyModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching company', error);
      }
    );
  }


  onDelete(data: any) {
    this.icompanyService.deleteCompany(data.c_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.companies = this.companies.filter(c => c.c_id !== data.c_id);
          this.companyGrid.api.applyTransaction({});
          this.icompanyService.refreshCompanies();
          alert("Successfully Removed");
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting company', error);
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.companyGrid.api)
  }


  createCompany(): void {
    this.company = new Company();
    $('#companyModal').modal('show');
  }


  getCompanies() {
    this.icompanyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
        this.companyGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  createOrUpdateCompany(): void {

    if (this.company.c_name != '' && this.company.c_sname!='' && this.company.c_type!='' && this.company.c_address!='' && this.company.c_country!='' && this.company.c_phone!=0 && this.company.c_fax!='' && this.company.c_post_box!='' && this.company.c_mail!='' && this.company.c_website!='') {
      this.company.c_cre_by = this.currentUser.u_id;
      this.icompanyService.createOrUpdateCompany(this.company).subscribe(
        (data: DbResult) => {
          if (data?.message == "Success") {
            this.icompanyService.refreshCompanies();
            $('#companyModal').modal('hide');
          } else {
            alert(data?.message || "An unexpected error occurred.");
          }
        },
        (error: any) => {
          console.error("Error occurred during createOrUpdateCompany:", error);
          alert("Something went wrong. Please try again.");
        }

      );
    } else {
      alert("Please Enter All Details");
    }

  }


  editCompany(c_id: number): void {


  }
}





