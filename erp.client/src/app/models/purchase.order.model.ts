export class PurchaseOrder {
  po_id: number;
  po_make: number;
  po_model: number;
  po_processor: number;
  po_harddisk: number;
  po_ram: number;
  po_cre_by: number;
  po_cre_by_name: string;
  po_cre_date: string;
  constructor() {
    this.po_id = 0;
    this.po_make=0,
    this.po_model=0,
    this.po_processor=0,
    this.po_harddisk=0,
    this.po_ram=0,
    this.po_cre_by = 0;
    this.po_cre_by_name = '';
    this.po_cre_date = '';
  }

}
