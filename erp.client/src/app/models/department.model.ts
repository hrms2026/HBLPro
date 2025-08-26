export class Department {
  d_id: number;
  d_name: string;
  d_sname:string;
  d_code:string;
  d_active_yn: string;
  d_cre_by: number;
  d_cre_by_name: string;
  d_cre_date: string;
  constructor() {
    this.d_id = 0;
    this.d_name='';
    this.d_sname='';
    this.d_code='';
    this.d_active_yn = '';
    this.d_cre_by = 0;
    this.d_cre_by_name = '';
    this.d_cre_date = '';
  }
}
