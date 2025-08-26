import { Component, ViewChild } from '@angular/core';
import { Company } from '../../models/company.model';
import { User } from '../../models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { ICompanyService } from '../../services/icompany.service';
import { GridService } from '../../services/igrid.service';
import { Data, Router } from '@angular/router';
import { ILoanService } from '../../services/iloan.service';
import { Loan } from '../../models/loan.model';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { format } from 'date-fns';
import { DbResult } from '../../models/dbresult.model';
import { Designation } from '../../models/desigation.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { IMasterDataService } from '../../services/imaster.data.service';
import { IDesignationService } from '../../services/idesignation.service';
import { Subscription } from 'rxjs';
import { ILoanPaymentService } from '../../services/iloanpayment.service';
import { LoanPayment } from '../../models/loanpayment.model';
declare var $: any;

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  companies: Company[] = [];
  loans: Loan[] = [];
  currentUser: User = new User();
  loan: Loan = new Loan();
  users: User[] = [];
  user: User = new User();
  designations: Designation[] = [];
  loanes: MasterData[] = [];
  requestParms = new RequestParms();

  Loanpayment: LoanPayment[] = [];
  loanpayment: LoanPayment = new LoanPayment();


  paymentHistories: LoanPayment[] = [];

  selectedLoanId: number | null = null;



  private subscription: Subscription = new Subscription();

  @ViewChild('loanGrid') loanGrid!: AgGridAngular;
  @ViewChild('paymentGrid') paymentGrid!: AgGridAngular;


  isCuttingAmountEnabled: boolean = false;
  loanType: string = '';

  constructor(private iuserService: IuserService, private iLoanService: ILoanService, private icompanyService:
    ICompanyService, private gridService: GridService, private router: Router, private imasterDataService: IMasterDataService, private idesignationService: IDesignationService, private iloanpaymentservice: ILoanPaymentService
  ) {

    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }



  selectedUser: any = null;

  ngOnInit(): void {
    this.getLoans();
    this.getCompanies();
    this.getUsers();
    this.getDesignations();
    
    this.subscription.add(
      this.iLoanService.refreshLoans$.subscribe(() => {
        this.getLoans();
      })
    );
    this.getMasterDatasByType("LoanType", (data) => { this.loanes = data; });

    if (this.users.length > 0) {
      const defaultUser = this.users[0];
      this.loan.l_user = defaultUser.u_id;
      this.setUserAndCompany(defaultUser.u_id);
    }

  }


  colDefs: ColDef[] = [
    { headerName: "Id", field: "l_id" },
    { headerName: "User", field: "l_user_name" },
    { headerName: "Company", field: "l_company_name" },
    { headerName: "Amount", field: "l_amount" },
    { headerName: "Paid Amount", field: "l_paid_amount" },
    { headerName: "Amount", field: "l_balance_amount" },
    { headerName: "Reason", field: "l_reason" },
    { headerName: "loan type", field: "l_type_name" },
    {
      headerName: 'Payments', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'payments', action: 'onpaymentHistory', cssClass: 'btn btn-success', icon: 'fa fa-money', onpaymentHistory: (data: any) => this.onAction('payment', data)
      },
    },
    {
      headerName: "Date", field: "l_issue_date", valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd');
      },
    },
    {
      headerName: 'Edit', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Edit', action: 'onEdit', cssClass: 'btn btn-info', icon: 'fa fa-edit',   disable: (data: any) => data.l_balance_amount == 0 ? true : false,
        onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Delete', action: 'onDelete', cssClass: 'btn btn-danger', icon: 'fa fa-trash',disable: (data: any) => data.l_balance_amount == 0 ? true : false,
         onDelete: (data: any) => this.onAction('delete', data)
      },
    },
    {
      headerName: "Create Date",
      field: "l_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd');
      },
    },
    { headerName: "created by", field: "l_cre_by_name" },
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  apcolDefs: ColDef[] = [
    { headerName: "Amount", field: "lh_amount" },
    { headerName: "Remarks", field: "lh_remark" },
    { headerName: "Created By", field: "lh_cre_by_name" },
    { headerName: "Created Date", field: "lh_cre_date" }
  ]

  onGridReady(event: GridReadyEvent) {
    this.gridService.resizeGridColumns(this.loanGrid.api);
  }

  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      case 'payment':
        this.onpaymentHistory(data);
        break;
      default: ;
    }
  }
  onUserSelect(event: any) {
    const userId = +event.target.value;
    this.setUserAndCompany(userId);
  }

  setUserAndCompany(userId: number) {
    const user = this.users.find(u => u.u_id === userId);
    if (user) {
      this.selectedUser = user;
      this.loan.l_company_id = user.u_c_id;
    }
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
        this.companies = data;

      },
      (error: any) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  onEdit(data: any) {
    this.iLoanService.getLoan(data.hs_id).subscribe(
      (data: Loan) => {
        this.loan = data;
        $('#LoanModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching Loan', error);
      }
    );
  }


  onDelete(data: any) {
    this.iLoanService.deleteLoan(data.l_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.loans = this.loans.filter(l => l.l_company_id !== data.l_company_id);
          this.loanGrid.api.applyTransaction({});
          this.iLoanService.refreshLoans();
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

  OnCompanyNameChange(l_company_id: number) {
    this.loan.l_company_id = l_company_id;
  }

  onLoanTypeChange(l_type: number) {
    this.loan.l_type = l_type;
    const selectedLoan = this.loanes.find(item => item.md_id == l_type);
    this.isCuttingAmountEnabled = selectedLoan?.md_name === 'Staff Loan';
  }



  onDesignationChange(l_designation: number) {
    this.loan.l_designation = l_designation;
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
  getcurrentUser(): number {
    return this.currentUser.u_id;
  }


  createOrUpdateLoan() {
    if (!this.loan.l_issue_date) {
      alert('Issue date is required.');
      return;
    }

    this.loan.l_cre_by = this.currentUser.u_id;
    this.iLoanService.createOrUpdateLoan(this.loan).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.iLoanService.refreshLoans();
          $('#loanModal').modal('show');

        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );


  }

  getLoans() {
    this.iLoanService.getLoans().subscribe(
      (data: Loan[]) => {
        this.loans = data;
        this.loanGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching loan', error);
      }
    );
  }

  createLoan(): void {
    this.loan = new Loan();
    $('#loanModal').modal('show');
  }

  onpaymentHistory(data: any) {
    this.loanpayment.lh_loan_id=data.l_id;
    this.getLoan(data.l_id);
    this. getpaymentHistory(data.l_id);
     $('#paymenthistoryModal').modal('show');

  }

  onpayments(loan: Loan): void {
   
    this.onpaymentHistory(loan.l_id); // Load and show modal
    this.loanpayment.lh_loan_id=loan.l_id;
    $('#paymenthistoryModal').modal('show');
  }

  CreateOrUpdateLoanPayment(){
    this.loanpayment.lh_cre_by = this.currentUser.u_id;
    this.iloanpaymentservice.CreateOrUpdateLoanPayment(this.loanpayment).subscribe({
      next: (data: DbResult) => {
        
         if(data.message=='Success'){
            this.getpaymentHistory(this.loanpayment.lh_loan_id);
            this.loanpayment.lh_remark='';
            this.loanpayment.lh_amount=0;

         }
         else
         {
           alert(data.message)
         }
      },
      error: (err: any) => {
        console.error('Error fetching payment history', err);
      }
    });
   
  }

  getpaymentHistory(lh_id: number) {
    this.iloanpaymentservice.getpaymentHistory(lh_id).subscribe({
      next: (data) => {
        this.paymentHistories = data;
      },
      error: (err) => {
        console.error('Error fetching payment history', err);
      }
    });
  }

 getLoan(l_id :number) {
    this.iLoanService.getLoan(l_id).subscribe(
      (data: Loan) => {
        this.loan = data;
      },
      (error: any) => {
        console.error('Error fetching loan', error);
      }
    );
  }


}














