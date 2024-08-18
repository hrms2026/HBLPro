export class Menu {
  m_id: number;
  m_name: string;
  m_link: string;
  m_fa_icon: string;
  m_parrent: number;
  m_parrent_name: string;
  m_type: string;
  m_cre_by: number;
  m_cre_by_name: string;
  m_cre_date: string;
  m_menu_items :Menu [];
 
  constructor() {

    this.m_id = 0;
    this.m_name='',
    this.m_link = '';
    this.m_fa_icon = '';
    this.m_parrent = 0;
    this.m_parrent_name = '';
    this.m_type = '';
    this.m_cre_by = 0;
    this.m_cre_by_name = '';
    this.m_cre_date=''
    this.m_menu_items= [];
    
  }
}
