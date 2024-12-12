export class Designation {
  filter(arg0: (Designation: any) => boolean): Designation {
    throw new Error('Method not implemented.');
  }
  ds_id: number;
  ds_name: string;
  ds_active_yn: string;
  ds_cre_by: number;
  ds_cre_by_name: string;
  ds_cre_date: string;
  constructor() {
    this.ds_id = 0;
    this.ds_name='',
    this.ds_active_yn = '';
    this.ds_cre_by = 0;
    this.ds_cre_by_name = '';
    this.ds_cre_date = '';
  }
}
