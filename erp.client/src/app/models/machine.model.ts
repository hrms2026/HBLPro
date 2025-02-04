export class Machine {
  m_id: number;
  m_name: string;
  m_port: number;
  m_ip_address: string;
  m_type:string;
  m_cre_by: number;
  m_cre_date: string;
  m_cre_by_name: string;
  constructor() {
    this.m_id = 0;
    this.m_name='',
    this.m_port = 0;
    this.m_ip_address = '';
    this.m_type = '';
    this.m_cre_by = 0;
    this.m_cre_date = '';
    this.m_cre_by_name ='';
  }

}
