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
import { Incentive } from '../models/incentive.model';

@Injectable({
  providedIn: 'root'
})
export class IIncentiveService {

  private apiUrl = `${environment.serverHostAddress}/api/Incentive`;
  private refreshIncentiveSubject = new Subject<void>();

  constructor(private http: HttpClient) { }
  
  getIncentives(requestParms:RequestParms): Observable<Incentive[]> {
    return this.http.post<Incentive[]>(this.apiUrl + "/getIncentives", requestParms);
  }

  CreateIncentive(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/Incentive", id);
  }

  deleteIncentive(id: any) {
    return this.http.post<DbResult>(this.apiUrl + "/deleteIncentive", id);
  }

  getIncentive(id: any) {
    return this.http.post<Incentive>(this.apiUrl + "/getIncentive", id);
  }
  
  createOrUpdateIncentive(incentive: Incentive): Observable<DbResult> {
    incentive.i_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateIncentive", incentive);
  }
 
  get refreshIncentives$() {
    return this.refreshIncentiveSubject.asObservable();
  }
  refreshIncentives(): void {
    this.refreshIncentiveSubject.next();
  }

}
