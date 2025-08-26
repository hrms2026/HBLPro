export class Loan {
  l_id: number;
  l_user:number;
  l_user_name:string;
  l_company_id:number;
  l_company_name:string;
  l_designation:number;
  l_designation_name='';
  l_amount:number;
  l_paid_amount:number;
  l_balance_amount:number;
  l_reason:string;
  l_type:number;
  l_type_name:string;
  l_cutting_amount:number;
  l_issue_date:string;
  l_payment:number;
  l_active_yn: string;
  l_cre_by: number;
  l_cre_by_name: string;
  l_cre_date: string;
  constructor() {
    this.l_id = 0;
    this.l_user=0;
    this.l_user_name='';
    this.l_company_id=0;
    this.l_company_name='';
    this.l_designation=0;
    this.l_designation_name='';
    this.l_amount=0;
    this.l_paid_amount=0;
    this.l_balance_amount=0;
    this.l_reason='';
    this.l_type=0;
    this.l_type_name='';
    this.l_cutting_amount=0;
    this.l_issue_date='';
    this.l_payment=0;
    this.l_active_yn = '';
    this.l_cre_by = 0;
    this.l_cre_by_name = '';
    this.l_cre_date = '';
  }
}
