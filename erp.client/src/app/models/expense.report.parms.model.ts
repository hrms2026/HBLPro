export class ExpenseReportParm {
  erp_category:number;
  erp_supplier: number;
  erp_report_type :string ;
  erp_date_range : string;

  constructor() {
    this.erp_category=0;
    this.erp_supplier=0;
    this.erp_report_type='';
    this.erp_date_range='';
  }

}