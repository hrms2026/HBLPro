export class Income {
  i_id: number;
  i_category: number;
  i_category_name : string;
  i_income_date: string;
  i_amount: number;
  i_payment_method: number;
  i_payment_method_name :string;
  i_remarks: string;
  i_cre_by: number;
  i_cre_by_name: string;
  i_cre_date: string;

  constructor() {
    this.i_id = 0;
    this.i_category = 0;
    this.i_category_name='';
    this.i_income_date = '';
    this.i_amount = 0;
    this.i_payment_method = 0;
    this.i_payment_method_name='';
    this.i_remarks = '';
    this.i_cre_by = 0;
    this.i_cre_by_name = '';
    this.i_cre_date = '';
  }
}
