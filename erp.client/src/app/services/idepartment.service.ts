import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class IDepartmentService {
  private apiUrl = `${environment.serverHostAddress}/api/Department`;
  private refreshDepartmentsSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.post<Department[]>(this.apiUrl + "/getDepartments", {});  
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.post<Department>(this.apiUrl + "/getDepartment", id);  
  }

  deleteDepartment(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteDepartment", id); 
  }

  createOrUpdateDepartment(department: Department): Observable<DbResult> {
    department.d_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateDepartment", department); 
  }
  get refreshDepartments$() {
    return this.refreshDepartmentsSubject.asObservable();
  }
  refreshDepartments(): void {
    this.refreshDepartmentsSubject.next();
  }
}
