export class Currency {
  cr_id: number;
  cr_name: string;
  cr_active_yn: string;
  cr_cre_by: number;
  cr_cre_by_name: string;
  cr_cre_date: string;
  constructor() {
    this.cr_id = 0;
    this.cr_name='',
    this.cr_active_yn = '';
    this.cr_cre_by = 0;
    this.cr_cre_by_name = '';
    this.cr_cre_date = '';
  }
}
