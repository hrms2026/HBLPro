export class Supplier {
  s_id: number;
  s_name: string;
  s_active_yn: string;
  s_cre_by: number;
  s_cre_by_name: string;
  s_cre_date: string;
  constructor() {
    this.s_id = 0;
    this.s_name='',
    this.s_active_yn = '';
    this.s_cre_by = 0;
    this.s_cre_by_name = '';
    this.s_cre_date = '';
  }
}
