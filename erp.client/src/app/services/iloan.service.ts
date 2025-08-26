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
import { HolidaySchedule } from '../models/holiday.schedule.model';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class ILoanService {
  getpaymentHistory(l_id: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = `${environment.serverHostAddress}/api/Loan`;
  private refreshLoanSubject = new Subject<void>();
  

  constructor(private http: HttpClient) { }

  getcompanies(): Observable<Company[]> {
    return this.http.post<Company[]>(this.apiUrl + "/getCompanies", {});
  }
  getLoans(): Observable<Loan[]> {
    return this.http.post<Loan[]>(this.apiUrl + "/getLoans", {});
  }

  createLoan(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/Loan", id);
  }

  deleteLoan(id: any) {
    return this.http.post<DbResult>(this.apiUrl + "/deleteLoan", id);
  }
  getLoan(id: any) {
    return this.http.post<Loan>(this.apiUrl + "/getLoan", id);
  }

  createOrUpdateLoan(loan: Loan): Observable<DbResult> {
    loan.l_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateLoan", loan);
  }
 
  get refreshLoans$() {
    return this.refreshLoanSubject.asObservable();
  }
  refreshLoans(): void {
    this.refreshLoanSubject.next();
  }
  

}
