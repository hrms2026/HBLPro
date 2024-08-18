export class Role {
  r_id: number;
  r_name: string;
  r_active_yn: string;
  r_cre_by: number;
  r_cre_by_name: string;
  r_cre_date: string;
  constructor() {
    this.r_id = 0;
    this.r_name='',
    this.r_active_yn = '';
    this.r_cre_by = 0;
    this.r_cre_by_name = '';
    this.r_cre_date = '';
  }

}
