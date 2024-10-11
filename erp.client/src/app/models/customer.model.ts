export class Customer {
  c_id: number;
  c_name: string;
  c_active_yn: string;
  c_cre_by: number;
  c_cre_by_name: string;
  c_cre_date: string;
  constructor() {
    this.c_id = 0;
    this.c_name='',
    this.c_active_yn = '';
    this.c_cre_by = 0;
    this.c_cre_by_name = '';
    this.c_cre_date = '';
  }
}
