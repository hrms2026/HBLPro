export class MasterData {
  md_id: number;
  md_name: string;
  md_type: string;
  md_active_yn: string;
  md_cre_by: number;
  md_cre_by_name: string;
  md_cre_date: string;
  constructor() {
    this.md_id = 0;
    this.md_name='',
    this.md_type = '';
    this.md_active_yn = '';
    this.md_cre_by = 0;
    this.md_cre_by_name = '';
    this.md_cre_date = '';
  }

}