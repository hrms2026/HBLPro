export class SalaryGeneration {
  sg_company: number;
  sg_company_name: string;
  sg_year_month:string;
  sg_employee_name: string;
  sg_personal_id:number;
  sg_employee_code:string;
  sg_acc_no: string;
  sg_present_salary: number;
  sg_attendance_remark:string;
  sg_basic_salary:number;
  sg_variable_salary:number;
  sg_cash_part:number;
  sg_total_salary:number;
  sg_due_to:string;
  sg_due_from:string;
  sg_uae_exchange_transfer:string;
  sg_variable_transfer:string;
  sg_cre_date: string;
  
  sg_selected_month:string;
  constructor() {
    this.sg_company= 0;
    this.sg_company_name= '';
    this.sg_year_month='';
    this.sg_employee_name = '';
    this.sg_personal_id= 0;
    this.sg_employee_code= '';
    this.sg_acc_no='';
    this.sg_present_salary = 0;
    this.sg_attendance_remark = '';
    this.sg_basic_salary = 0;
    this.sg_variable_salary = 0;
    this.sg_cash_part=0;
    this.sg_total_salary=0;
    this.sg_due_to='';
    this.sg_due_from='';
    this.sg_uae_exchange_transfer='';
    this.sg_variable_transfer='';
    this.sg_cre_date='';
    this.sg_selected_month='';
  }

  
}
