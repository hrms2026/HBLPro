export class Promotion
 {
  p_id: number;
  p_user:number;
  p_user_name:string;
  p_company_id:number;
  p_company_name:string
  p_designation:number;
  p_designation_name:string;
  p_date:string;
  p_basic_salary:number;
  p_allowance:number;
  p_cash_part:number;
  p_current_salary:number;
  p_cre_by: number;
  p_cre_by_name: string;
  p_cre_date: string;
  constructor() {
    this.p_id=0;
    this.p_user=0;
    this.p_user_name='';
    this.p_company_id=0;
    this.p_company_name='';
    this.p_designation=0;
    this.p_designation_name='';
    this.p_date='';
    this.p_basic_salary=0;
    this.p_allowance=0;
    this.p_cash_part=0;
    this.p_current_salary=0;
    this.p_cre_by = 0;
    this.p_cre_by_name = '';
    this.p_cre_date = '';
  }
}
