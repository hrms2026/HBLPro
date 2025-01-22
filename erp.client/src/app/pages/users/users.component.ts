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
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { IMasterDataService } from '../../services/imaster.data.service';
import { Company } from '../../models/company.model';
import { ICompanyService } from '../../services/icompany.service';
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
  simRequired :boolean=false;
  requestParms=new RequestParms();
  genders:MasterData [] =[];
  maritalStatus:MasterData [] =[];
  nationalities:MasterData [] =[];
  religions:MasterData [] =[];
  qualifications:MasterData [] =[];
  exchanges:MasterData [] =[];
  paymentmethods:MasterData [] =[];
  benifitsafter:MasterData [] =[];
  visaFrom:Company[]=[];
  isEditing: boolean = false;
  private subscription: Subscription = new Subscription();
  @ViewChild('userGrid') userGrid!: AgGridAngular;

 

  constructor(private IuserService: IuserService, private iroleService: IroleService, private icompanyService: ICompanyService, 
    private gridService: GridService, private iuserService: IuserService, private router: Router,
    private imasterDataService: IMasterDataService
  ) {
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
    this.getCompanies();
    this.getMasterDatasByType("Gender", (data) => { this.genders = data; });
    this.getMasterDatasByType("MaritialStatus", (data) => { this.maritalStatus = data; });
    this.getMasterDatasByType("Nationality", (data) => { this.nationalities = data; });
    this.getMasterDatasByType("Religion", (data) => { this.religions = data; });
    this.getMasterDatasByType("Qualification", (data) => { this.qualifications = data; });
    this.getMasterDatasByType("AccountType", (data) => { this.exchanges = data; });
    this.getMasterDatasByType("PaymentType", (data) => { this.paymentmethods = data; });
    this.getMasterDatasByType("BenifitsAfter", (data) => { this.benifitsafter = data; });


  }
  getUsers() {
    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.userGrid.api.applyTransaction({});
        setTimeout(() => {
          this.userGrid.api.autoSizeAllColumns();
        }, 500);
      
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );

  }

  
  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
      this.requestParms = new RequestParms();
      this.requestParms.type = masterType;
      this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
        (data: MasterData[]) => {
          callback(data);  // Pass the data to the callback function
        },
        (error: any) => {
          console.error('Error fetching master data', error);
          callback([]);  // Pass an empty array if there's an error
        }
      );
    }
    
    getCompanies() {
      this.icompanyService.getCompanies().subscribe(
        (data: Company[]) => {
          this.visaFrom = data;
        },
        (error: any) => {
          console.error('Error fetching companies', error);
        }
      );
    }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "u_id" },
    { headerName: "Name", field: "u_name" },
    { headerName: "Username", field: "u_username" },
    { headerName: "Role", field: "u_role_name" },
    { headerName: "Is Admin ?", field: "u_is_admin" },
    { headerName: "Active Y/N", field: "u_active_yn" },
    { headerName: "Mother Name", field: "u_mother_name" },
    { headerName: "Father Name", field: "u_father_name" },
    { headerName: "Contact Person", field: "u_contact_person" },
    { headerName: "Nationality", field: "u_nationality_name" },
    { headerName: "Date Of Birth", field: "u_date_of_birth" },
    { headerName: "Gender", field: "u_gender_name" },
    { headerName: "Emp Code", field: "u_emp_code" },
    { headerName: "Date Of Join", field: "u_date_of_join" },
    { headerName: "Contact email", field: "u_contact_email" },
    { headerName: "Contact mobile", field: "u_contact_mobile" },
    { headerName: "Contact home", field: "u_contact_home" },
    { headerName: "Contact office", field: "u_contact_office" },
    { headerName: "Contact address", field: "u_contact_address" },
    { headerName: "Contact sim required", field: "u_contact_sim_required" },
    { headerName: "Created By name", field: "u_cre_by_name" },
    { headerName: "Created date", field: "u_cre_date" },
    { headerName: "visa from", field: "u_visa_from" },
    { headerName: "file no", field: "u_file_no" },
    { headerName: "visa uid", field: "u_visa_uid" },
    { headerName: "visa Issue date", field: "u_visa_issue_date" },
    { headerName: "visa Expiry date", field: "u_visa_expiry_date" },
    { headerName: "labour id", field: "u_labour_id" },
    { headerName: "labour Issue date", field: "u_labour_issue_date" },
    { headerName: "labour Expiry date", field: "u_labour_expiry_date" },
    { headerName: "Emid", field: "u_emid" },
    { headerName: "Emid Issue date", field: "u_emid_issue_date" },
    { headerName: "Emid Expiry date", field: "u_emid_expiry_date" },
    { headerName: "Passport no", field: "u_passport_no" },
    { headerName: "Passport issue date", field: "u_passport_issue_date" },
    { headerName: "passport expiry date", field: "u_passport_expiry_date" },
    { headerName: "Marital status", field: "u_marital_status_name" },
    { headerName: "Religion", field: "u_religion_name" },
    { headerName: "Qualification", field: "u_qualification_name" },
    { headerName: "Specialized in", field: "u_specialized_in" },
    { headerName: "Personal id", field: "u_personal_id" },
    { headerName: "payment method", field: "u_payment_method_name" },
    { headerName: "Account no", field: "u_account_no" },
    { headerName: "Exchange", field: "u_uae_exchange_branch_name" },
    { headerName: "Basic salary", field: "u_basic_salary" },
    { headerName: "Allowance", field: "u_allowance" },
    { headerName: "Over Time", field: "u_over_time" },
    { headerName: "Present salary", field: "u_present_salary" },
    { headerName: "Benefits after", field: "u_benefits_after_name" },
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
        this.isEditing = true; 
        $('#usersModal').modal('show');
        this.setSelect2Fields();
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );

  }
  onModalClose() {
    this.isEditing = false;
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

    if (this.user.u_emp_code != '' 
   && this.user.u_name!=''  && this.user.u_username != '' 
    && this.user.u_contact_person!='' && this.user.u_nationality!=0
    && this.user.u_date_of_birth!= 0 && this.user.u_gender!=0
    && this.user.u_date_of_join!= 0 && this.user.u_contact_email!=''
    && this.user.u_contact_mobile!= '' && this.user.u_labour_id!= ''
    && this.user.u_marital_status!=0 && this.user.u_visa_from!='' 
    && this.user.u_passport_no!='' && this.user.u_passport_expiry_date!=''
    && this.user.u_personal_id!='' && this.user.u_account_no!=''
   ) 

    this.user.u_cre_by = this.currentUser.u_id;
    this.iuserService.createOrUpdateUser(this.user).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message == "Success") {
          this.iuserService.refreshUsers();
          $('#usersModal').modal('hide');

        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );
  /*} else {
    alert("Please Enter All Details");
  }*/

}



  onGridReady(event: GridReadyEvent) {
    setTimeout(() => {
      this.gridService.resizeGridColumns(this.userGrid.api);
    }, 500);
  }

  createUser(): void {
    this.user = new User();
    $('#usersModal').modal('show');
  }

  OnRoleChange(u_role_id: number) {
    this.user.u_role_id = u_role_id;

  }
  
  OnGenderChange(u_gender:number){
    this.user.u_gender=u_gender;
  }

  OnNationiltyChange(u_nationality:number){
    this.user.u_nationality=u_nationality;
  }

  onSimRequiredChange(event: Event): void {

    const isChecked = (event.target as HTMLInputElement).checked;
    this.user.u_contact_sim_required=isChecked+'';
   
  }

  OnMaritalStatusChange(u_marital_status:number){
    this.user.u_marital_status=u_marital_status;
  }
  OnQualificationChange(u_qualification:number){
    this.user.u_qualification=u_qualification;
  }

  OnPaymentMethodChange(u_payment_method:number){
    this.user.u_payment_method=u_payment_method;
  }
  OnUaeExchangeBranchChange(u_uae_exchange_branch:number){
    this.user.u_uae_exchange_branch=u_uae_exchange_branch;
  }
  OnBenefitsAfterChange(u_benefits_after:number){
    this.user.u_benefits_after=u_benefits_after;
  }
  OnReligionChange(u_religion:number){
    this.user.u_religion=u_religion;
  }

  setSelect2Fields(){
   
    $("#u_role_id").select2().val(this.user.u_role_id).trigger("change");
    $("#u_nationality").select2().val(this.user.u_nationality).trigger("change");
    $("#u_gender").select2().val(this.user.u_gender).trigger("change");
    $("#u_marital_status").select2().val(this.user.u_marital_status).trigger("change");
    $("#u_qualification").select2().val(this.user.u_qualification).trigger("change");
    $("#u_payment_method").select2().val(this.user.u_payment_method).trigger("change");
    $("#u_uae_exchange_branch").select2().val(this.user.u_uae_exchange_branch).trigger("change");
    $("#u_benefits_after").select2().val(this.user.u_benefits_after).trigger("change");
    $("#u_religion").select2().val(this.user.u_religion).trigger("change");
 
  }

}