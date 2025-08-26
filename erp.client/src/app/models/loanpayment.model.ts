export class LoanPayment {
  lh_id: number;
  lh_loan_id:number;
  lh_amount:number;
  lh_remark:string;
  lh_active_yn: string;
  lh_cre_by: number;
  lh_cre_by_name: string;
  lh_cre_date: string;
  constructor() {
    this.lh_id = 0;
    this.lh_loan_id=0;
    this.lh_amount=0;
    this.lh_remark='';
    this.lh_active_yn = '';
    this.lh_cre_by = 0;
    this.lh_cre_by_name = '';
    this.lh_cre_date = '';
  }
}
