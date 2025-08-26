export class Incentive {
  i_id: number;
  i_month:string;
  i_user: number;
  i_user_name:string;
  i_amount:number;
  i_payment_type:number;
  i_payment_type_name:string;
  i_reason:string;
  i_active_yn: string;
  i_cre_by: number;
  i_cre_by_name: string;
  i_cre_date: string;
  constructor() {
    this.i_id = 0;
    this.i_month='';
    this.i_user=0;
    this.i_user_name='';
    this.i_amount=0;
    this.i_payment_type=0;
    this.i_payment_type_name='';
    this.i_reason='';
    this.i_active_yn = '';
    this.i_cre_by = 0;
    this.i_cre_by_name = '';
    this.i_cre_date = '';
  }
}
