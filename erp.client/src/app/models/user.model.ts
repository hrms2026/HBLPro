export class User {
  u_id: number;
  u_name: string;
  u_username: string;
  u_password: string;
  u_email: string;
  u_role_id: number;
  u_role_name: string;
  u_is_admin: string;
  u_active_yn: string;
  u_m_name: string;
  u_f_name: string;
  u_passport_no: number;
  u_contact_person: string;
  u_nationality: string;
  u_date_of_birth: number;
  u_gender: string;
  u_address: string;
  u_emp_code: number;
  u_file_no: number;
  u_date_of_join: number;
  u_cre_by: number;
  u_cre_by_name: string;
  u_cre_date: string;
  constructor() {
    this.u_id = 0;
    this.u_name = '',
    this.u_username = '';
    this.u_password = '';
    this.u_email = '';
    this.u_role_id = 0;
    this.u_role_name = '';
    this.u_is_admin = '';
    this.u_active_yn = '';
    this.u_m_name='';
    this.u_f_name='';
    this.u_passport_no = 0;
    this.u_contact_person ='';
    this.u_nationality ='';
    this.u_date_of_birth = 0;
    this.u_gender ='';
    this.u_address ='';
    this.u_emp_code = 0;
    this.u_file_no = 0;
    this.u_date_of_join = 0;
    this.u_cre_by = 0;
    this.u_cre_by_name = '';
    this.u_cre_date = '';
  }

}
