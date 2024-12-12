export class Company {
    c_id: number;
    c_name: string;
    c_type: string;
    c_sname: string;
    c_country: string;
    c_address: string;
    c_post_box: string;
    c_phone: number;
    c_fax: string;
    c_mail: string;
    c_website: string;
    c_cre_by: number;
    c_cre_by_name: string;
    c_cre_date: string;
    constructor() {
      this.c_type = '';
      this.c_id = 0,
      this.c_name = '';
      this.c_sname = '';
      this.c_country = '';
      this.c_address = '';
      this.c_post_box = '';
      this.c_phone = 0;
      this.c_fax = '';
      this.c_mail = '';
      this.c_website = '';
      this.c_cre_by = 0;
      this.c_cre_by_name = '';
      this.c_cre_date = '';

    }
  }
  