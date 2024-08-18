import { isNullOrUndefined } from "@swimlane/ngx-datatable";

export class DbResult {
  id: number;
  message: string;
  obj:any;

  constructor() {
    this.id = 0;
    this.message = '';
    this.obj=isNullOrUndefined;
  }

}
