export class Attendance {
  att_id: number;
  att_emp_id: number;
  att_emp_name:string;
  att_punch_time: string;
  att_punch_type: string;
  att_machine_id: number;
  att_machine_name: string;
  att_cre_date: string;
  constructor() {
    this.att_id = 0;
    this.att_emp_id= 0;
    this.att_emp_name='';
    this.att_punch_time = '';
    this.att_punch_type= '';
    this.att_machine_id = 0;
    this.att_machine_name='';
    this.att_cre_date = '';
  }

}
