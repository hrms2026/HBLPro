import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class ICompanyService {
  private apiUrl = `${environment.serverHostAddress}/api/Company`;
  private refreshCompaniesSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.post<Company[]>(this.apiUrl + "/getCompanies", {});  
  }

  getCompany(id: number): Observable<Company> {
    return this.http.post<Company>(this.apiUrl + "/getCompany", id);  
  }

  deleteCompany(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCompany", id); 
  }

  createOrUpdateCompany(company: Company): Observable<DbResult> {
    company.c_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCompany", company); 
  }
  get refreshCompany$() {
    return this.refreshCompaniesSubject.asObservable();
  }
  refreshCompanies(): void {
    this.refreshCompaniesSubject.next();
  }
}
