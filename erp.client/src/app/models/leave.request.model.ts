export class LeaveRequest {
  lr_id: number;
  lr_user:number;
  lr_user_name:string;
  lr_department: number;
  lr_department_name: String;
  lr_designation: number;
  lr_designation_name: string;
  lr_leave_type: number;
  lr_leave_type_name: string;
  lr_leave_from: string;
  lr_leave_to:string;
  lr_leave_days:number;
  lr_contact_details: string;
  lr_phone: string;
  lr_address: string;
  lr_reason: string;
  lr_status:number;
  lr_cre_by: number;
  lr_cre_by_name:string;
  lr_cre_date: string;
  lr_attachment: string;
  constructor() {
    this.lr_id =0;
    this.lr_user=0;
    this.lr_user_name='';
    this.lr_department=0;
    this.lr_department_name='';
    this.lr_designation=0;
    this.lr_designation_name='';
    this.lr_leave_type= 0;
    this.lr_leave_type_name='';
    this.lr_leave_from = '';
    this.lr_leave_to = '';
    this.lr_leave_days=0;
    this.lr_contact_details='';
    this.lr_phone ='';
    this.lr_address='';
    this.lr_reason= '';
    this.lr_status=0;
    this.lr_cre_by=0;
    this.lr_cre_by_name='';
    this.lr_cre_date = '';
    this.lr_attachment='';
  }

}
