import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ILoginService } from './ilogin.service';

@Injectable({
  providedIn: 'root'
})
export class IuserService {
  refreshReleaseDocuments() {
    throw new Error('Method not implemented.');
  }
  getReleaseDocuments() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.serverHostAddress}/api/User`;
  private refreshUsersSubject = new Subject<void>();

  constructor(private http: HttpClient, private iLoginService: ILoginService) { }

  private getHttpHeaders(): HttpHeaders {
    const token = this.iLoginService.getToken(); // Retrieve the token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ensure token is correctly formatted and included
    });
  }

  getUsers(): Observable<User[]> {
    const headers = this.getHttpHeaders();
    return this.http.post<User[]>(`${this.apiUrl}/getUsers`, {}, { headers });  
  }

  getUser(id: number): Observable<User> {
    const headers = this.getHttpHeaders();
    return this.http.post<User>(`${this.apiUrl}/getUser`, id, { headers });  
  }

  deleteUser(id: number): Observable<DbResult> {
    const headers = this.getHttpHeaders();
    return this.http.post<DbResult>(`${this.apiUrl}/deleteUser`, id, { headers }); 
  }

  createOrUpdateUser(user: User): Observable<DbResult> {
    user.u_cre_date = new Date().toISOString();
    const headers = this.getHttpHeaders();
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdateUser`, user, { headers }); 
  }

  get refreshUsers$() {
    return this.refreshUsersSubject.asObservable();
  }

  refreshUsers(): void {
    this.refreshUsersSubject.next();
  }

  getCurrentUser(): User  {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      try {
        const user: User = JSON.parse(userJson);
        return user;
      } catch (error) {

        console.error('Failed to parse user data:', error);
        return new User(); // Return null or handle the error as needed
      }
    }
    return new User(); // Return null if no user data is found
  }
}
