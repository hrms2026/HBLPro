import { Component } from '@angular/core';
import { ISalarygenerationService } from '../../services/isalary.generation.service';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { IMasterDataService } from '../../services/imaster.data.service';
import { SalaryGeneration } from '../../models/Salarygeneration.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICompanyService } from '../../services/icompany.service';
import { Company } from '../../models/company.model';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-salarygeneration',
  templateUrl: './salarygeneration.component.html',
  styleUrl: './salarygeneration.component.css'
})
export class SalarygenerationComponent {
   salarygenerations: SalaryGeneration []=[]
  salarygeneration :SalaryGeneration = new SalaryGeneration();
  salaryData: any[] = []
  requestParms: any;
  years:MasterData []=[];
   companies: Company[] = [];
   pagination = true;
   paginationPageSize15 = 15;
   paginationPageSizeSelector15 = [15, 30, 50, 100];
   paginationPageSize10 = 10;
   paginationPageSizeSelector10 = [10, 20, 50, 100];
   domLayout: DomLayoutType = 'autoHeight';
  
    sg_year_month: []=[]  // This should already exist based on your template


   
 

   private subscription: Subscription = new Subscription();
  
constructor(private iSalarygenerationService: ISalarygenerationService,private imasterDataService: IMasterDataService,private icompanyService: ICompanyService
  ) {

   
  }
    
  
  // Get current month in YYYY-MM format
  currentYear = new Date().getFullYear();
  currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');

  onMonthChange() {
    if (this.salarygeneration.sg_year_month) {
      const [year, month] = this.salarygeneration.sg_year_month.split('-');
      console.log(`Selected month: Year ${year}, Month ${month}`);
      // Add your custom logic here
    }
  }


  ngOnInit(): void {
    this.getCompanies();
    this.getMasterDatasByType("year", (data) => { this.years = data; });
  
  }

 colDefs: ColDef[] = [

  { headerName: "sl no", field: "sl_no" },
    { headerName: "Employee Name", field: "employee_name" },
    { headerName: "personal Id", field: "personal_id" },
    { headerName: "Employee Code", field: "employee_code" },
    { headerName: "Account number", field: "Account_number" },
    { headerName: "present salary", field: "present_salary" },
    { headerName: "Attendance Remarks", field: "Attendance_Remarks" },
    { headerName: "Basic Salary", field: "Basic_Salary" },
    { headerName: "Variable_salary", field: "Variable_salary" },
    { headerName: "Cash Part", field: "Cash_part" },
    { headerName: "Total_salary", field: "Total_salary" },
    { headerName: "Due to", field: "Due_to" },
    { headerName: "Due from", field: "Due_from" },
    { headerName: "Uae_exchange_transfer", field: "Uae_Exchange_transfer" },
    { headerName: "Variable transfer", field: "Variable_Transfer" }

  ];

  onGridReady(event: GridReadyEvent) {
    setTimeout(() => {
      
    }, 500);
  }


   defaultColDef = {
      sortable: true,
      filter: true
    };
  
    frameworkComponents = {
      actionRenderer: ActionRendererComponent
    };

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





  viewSalary(){
    if (!this.salarygeneration.sg_company || !this.salarygeneration.sg_year_month) {
      alert('Please select a company and a year/month.');
      return;
    }
  
    this.iSalarygenerationService.GetSalarygenerations(
      this.salarygeneration.sg_company, 
      this.salarygeneration.sg_year_month
    ).subscribe(
      (data: SalaryGeneration[]) => {
        if (data.length === 0) {
          alert('No employees found for selected company/month');
        } else {
          this.salarygenerations = data;
        }
      },
      (error: any) => {
        console.error('Error fetching data', error);
        alert('Failed to fetch data. Check console for details');
      }
    );

  }

generateSalary(){
   if (!this.salarygeneration.sg_company || !this.salarygeneration.sg_year_month) {
    alert('Please select a company and a year.');
    return;
  }

  this.iSalarygenerationService.generateSalary(this.salarygeneration.sg_company, this.salarygeneration.sg_year_month)
    .subscribe(
      (data: SalaryGeneration) => {
        alert('Salary generated successfully!');
        this.viewSalary(); // Refresh the salary data after generation
      },
      (error: any) => {
        console.error('Error generating salary', error);
        alert('Failed to generate salary. Please try again.');
      }
    );
}


convertToExcel(){

}


OnCompanyNameChange(sg_company:number){
  this.salarygeneration.sg_company=sg_company;
}










}
