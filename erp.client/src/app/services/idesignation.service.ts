import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';

@Injectable({
  providedIn: 'root'
})
export class IDesignationService {
  private apiUrl = `${environment.serverHostAddress}/api/Designation`;
  private refreshDepartmentsSubject = new Subject<void>();
 
  
  constructor(private http: HttpClient) { }

  getDesignations(): Observable<Designation[]> {
    return this.http.post<Designation[]>(this.apiUrl + "/getDesignations", {});  
  }

  getDesignation(id: number): Observable<Designation> {
    return this.http.post<Designation>(this.apiUrl + "/getDesignation", id);  
  }

  deleteDesignation(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteDesignation", id); 
  }

  createOrUpdateDesignation(designation: Designation): Observable<DbResult> {
    designation.ds_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateDesignation", designation); 
  }
  get refreshDesignations$() {
    return this.refreshDepartmentsSubject.asObservable();
  }
  refreshDesignations(): void {
    this.refreshDepartmentsSubject.next();
  }
}
