import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class IroleService {
  private apiUrl = `${environment.serverHostAddress}/api/Role`;
  private refreshRolesSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.post<Role[]>(this.apiUrl + "/getRoles", {});  
  }

  getRole(id: number): Observable<Role> {
    return this.http.post<Role>(this.apiUrl + "/getRole", id);  
  }

  deleteRole(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteRole", id); 
  }

  createOrUpdateRole(role: Role): Observable<DbResult> {
    role.r_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRole", role); 
  }
  get refreshRoles$() {
    return this.refreshRolesSubject.asObservable();
  }
  refreshRoles(): void {
    this.refreshRolesSubject.next();
  }
}
