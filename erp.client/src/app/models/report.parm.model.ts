export class ReportParm {
    rp_report_type :string ;
    rp_date_range : string ;
    rp_user : number;
    rp_company_id: number;
    constructor() {
      this.rp_report_type='';
      this.rp_date_range='';
      this.rp_user=0;
      this.rp_company_id=0;
    }
  
  }