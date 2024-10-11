export class Category {
  ct_id: number;
  ct_name: string;
  ct_type :string;
  ct_active_yn: string;
  ct_cre_by: number;
  ct_cre_by_name: string;
  ct_cre_date: string;
  constructor() {
    this.ct_id = 0;
    this.ct_name='',
    this.ct_type='',
    this.ct_active_yn = '';
    this.ct_cre_by = 0;
    this.ct_cre_by_name = '';
    this.ct_cre_date = '';
  }
}
