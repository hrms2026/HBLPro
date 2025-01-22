export class RequestParms {
  id: number;
  name: string;
  type: string;
  user :number;
  details :string;
  daterange :string;
  flag:string;
  constructor() {
    this.id = 0;
    this.name='',
    this.type=''
    this.user=0;
    this.details='';
    this.daterange='';
    this.flag='';
  }

}
