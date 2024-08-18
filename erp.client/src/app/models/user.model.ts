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
  u_cre_by: number;
  u_cre_by_name: string;
  u_cre_date: string;
  constructor() {
    this.u_id = 0;
    this.u_name='',
    this.u_username = '';
    this.u_password = '';
    this.u_email = '';
    this.u_role_id = 0;
    this.u_role_name = '';
    this.u_is_admin = '';
    this.u_active_yn = '';
    this.u_cre_by = 0;
    this.u_cre_by_name = '';
    this.u_cre_date = '';
  }

}
