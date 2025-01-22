import { ServerSideTransactionResultStatus } from "ag-grid-community";

export class ReleaseDocument {
  rd_id:number;
  rd_emp_id: number;
  rd_passport_no: string;
  rd_cre_by: number;
  rd_cre_by_name: string;
  rd_cre_date:string;
  rd_released_to: number;
  rd_released_date: string;
  rd_reason: string;
  rd_received_yn: string;
  rd_received_by:number;
  rd_received_by_name:string;
  rd_received_date:string;
  
  

  constructor() {
    this.rd_id = 0;
    this.rd_emp_id=0;
    this.rd_passport_no ='';
    this.rd_cre_by = 0;
    this.rd_cre_by_name = '';
    this.rd_cre_date = '' ;
    this.rd_released_to = 0;
    this.rd_released_date = '';
    this.rd_reason = '';
    this.rd_received_yn = '';
    this.rd_received_by =0;
    this.rd_received_by_name = '';
    this.rd_received_date='';
    
  }

}
