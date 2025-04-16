import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';
import { Attendance } from '../models/Attendance.model';
import { RequestParms } from '../models/requestParms';
import { LeaveRequest } from '../models/leave.request.model';
import { LeaveApprovalHistory } from '../models/leaveapprovalhistory.model';
import { Company } from '../models/company.model';
import { SalaryGeneration } from '../models/Salarygeneration.model';

@Injectable({
  providedIn: 'root'
})
export class ISalarygenerationService {
  GetSalarygeneration(sg_company: number, sg_year_month: string) {
    throw new Error('Method not implemented.');
  }
 



  private apiUrl = `${environment.serverHostAddress}/api/LeaveRequest`;
  private refreshLeaveRequestsSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
      return this.http.post<Company[]>(this.apiUrl + "/getCompanies", {});  
    }
  
  GetSalarygenerations(sg_company: number, sg_year_month: string): Observable<SalaryGeneration[]> {
      return this.http.post<SalaryGeneration[]>(`${this.apiUrl}/getSalarygenerations`, {});  
    }
  
 
  
    generateSalary(sg_company: number, sg_year_month: string): Observable<SalaryGeneration> {
      
      return this.http.post<SalaryGeneration>('/api/generateSalary', { sg_company, sg_year_month });
    }
    

 
  deleteSalarygeneration(id: any) {
    return this.http.post<DbResult>(this.apiUrl + "/deleteSalarygeneration", id);
  }
 
  
  get refreshLeaveRequests$() {
    return this.refreshLeaveRequestsSubject.asObservable();
  }
  refreshLeaveRequests(): void {
    this.refreshLeaveRequestsSubject.next();
  }
}
