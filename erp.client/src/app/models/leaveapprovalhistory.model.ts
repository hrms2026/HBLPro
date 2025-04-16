export class LeaveApprovalHistory {
  lh_id: number;
  lh_lr_id: number;
  lh_status:number;
  lh_status_name:string;
  lh_cre_by: number;
  lh_cre_by_name:string;
  lh_cre_date:string;
  constructor() {
    this.lh_id = 0;
    this.lh_lr_id= 0;
    this.lh_status=0;
    this.lh_status_name='';
    this.lh_cre_by = 0;
    this.lh_cre_by_name='';
    this.lh_cre_date=''
  }

}

