import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ILoginService } from './ilogin.service';
import { Menu } from '../models/menu.model';
import { RequestParms } from '../models/requestParms';
import { MenuType } from '../models/menuType';
import { MenuAllocation } from '../models/menu.allocation.model';

@Injectable({
  providedIn: 'root'
})
export class IMenuService {
  private apiUrl = `${environment.serverHostAddress}/api/Menu`;
  private refreshMenusSubject = new Subject<void>();
  parms :any ;

  constructor(private http: HttpClient, private iLoginService: ILoginService) { }

  private getHttpHeaders(): HttpHeaders {
    const token = this.iLoginService.getToken(); // Retrieve the token from AuthService
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'  // Ensure Content-Type is set to application/json
    });
  }

  getMenus(): Observable<Menu[]> {
    const headers = this.getHttpHeaders();
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenus`, {}, { headers });  
  }

  getMenu(id: number): Observable<Menu> {
    const headers = this.getHttpHeaders();
    return this.http.post<Menu>(`${this.apiUrl}/getMenu`, id, { headers });  
  }

  getMenuTypes(): Observable<MenuType[]> {
    const headers = this.getHttpHeaders();
    return this.http.post<MenuType[]>(`${this.apiUrl}/getMenuTypes`, {}, { headers });  
  }

  getMenusByType( requestParms : RequestParms): Observable<Menu[]> {
   
    const headers = this.getHttpHeaders();
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenusByType`, requestParms, { headers });
  }

  getMenusByRoleAndType( requestParms : RequestParms): Observable<Menu[]> {
   
    const headers = this.getHttpHeaders();
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenusByRoleAndType`, requestParms, { headers });

  }

  deleteMenu(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteMenu", id); 
  }

  createOrUpdateMenu(menu: Menu): Observable<DbResult> {
    menu.m_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateMenu", menu); 
  }

  createOrUpdateRoleMenu(menuallocation: MenuAllocation): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRoleMenu", menuallocation); 
  }

  getMenusByRole(id: number): Observable<Menu[]> {
    return this.http.post<Menu[]>(this.apiUrl + "/getMenusByRole", id); 
  }

  get refreshMenus$() {
    return this.refreshMenusSubject.asObservable();
  }

  refreshMenus(): void {
    this.refreshMenusSubject.next();
  }
}
