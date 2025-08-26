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
import { LoanPayment } from '../models/loanpayment.model';

@Injectable({
  providedIn: 'root'
})
export class ILoanPaymentService {

  private apiUrl = `${environment.serverHostAddress}/api/LoanPayment`;
  private refreshLoanSubject = new Subject<void>();
  

  constructor(private http: HttpClient) { }

  getpaymentHistory(lh_id:number): Observable<LoanPayment[]> {
    return this.http.post<LoanPayment[]>(this.apiUrl + "/getpaymentHistory",lh_id);
  }
  get refreshLoanPayments$() {
    return this.refreshLoanSubject.asObservable();
  }
  refreshLoanPayments(): void {
    this.refreshLoanSubject.next();
  }

  CreateOrUpdateLoanPayment(loanPayment:LoanPayment): Observable<DbResult> {
    loanPayment.lh_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/CreateOrUpdateLoanPayment",loanPayment);
  }

}
