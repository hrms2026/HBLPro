import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { UserCredential } from '../models/usercredential.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class ILoginService {
  private apiUrl = `${environment.serverHostAddress}/api/Login`;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getLogin(credential:UserCredential): Observable<UserCredential> {
    return this.http.post<UserCredential>(this.apiUrl + "/getLogin", credential).pipe(
      tap((response: UserCredential) => {
        localStorage.setItem('token', response.token);
      })
    );;  
  }
  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
