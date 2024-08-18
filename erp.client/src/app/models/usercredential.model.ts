import { User } from "./user.model";

export class UserCredential {
  id: number;
  username: string;
  password: string;
  message: string;
  token: string;
  user:User;

  constructor() {
    this.id = 0;
    this.username='',
    this.password = '';
    this.message = '';
    this.token = '';
    this.user=new User();
  }

}
