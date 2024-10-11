export class Expense {
  e_id: number;
  e_category: number;
  e_category_name: string;
  e_expense_date: string;
  e_amount: number;
  e_payment_method: number;
  e_payment_method_name :string;
  e_remarks: string;
  e_cre_by: number;
  e_cre_by_name: string;
  e_cre_date: string;

  constructor() {
    this.e_id = 0;
    this.e_category = 0;
    this.e_category_name='';
    this.e_expense_date = '';
    this.e_amount = 0;
    this.e_payment_method = 0;
    this.e_payment_method_name='';
    this.e_remarks = '';
    this.e_cre_by = 0;
    this.e_cre_by_name = '';
    this.e_cre_date = '';
  }
}