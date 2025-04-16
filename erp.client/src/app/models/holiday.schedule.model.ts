export class HolidaySchedule
 {
  hs_id: number;
  hs_company_id: number;
  hs_reason: string;
  hs_leave_from: string;
  hs_leave_to:string;
  hs_leave_days:number|null;
  hs_cre_by: number;
  hs_cre_by_name: string;
  hs_cre_date: string;
  constructor() {
    this.hs_id=0;
    this.hs_company_id = 0;
    this.hs_reason='',
    this.hs_leave_from = '';
    this.hs_leave_to='';
    this.hs_leave_days=0;
    this.hs_cre_by = 0;
    this.hs_cre_by_name = '';
    this.hs_cre_date = '';
  }
}
