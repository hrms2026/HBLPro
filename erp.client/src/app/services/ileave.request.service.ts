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

@Injectable({
  providedIn: 'root'
})
export class ILeaveRequestService {



  private apiUrl = `${environment.serverHostAddress}/api/LeaveRequest`;
  private refreshLeaveRequestsSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.post<LeaveRequest[]>(this.apiUrl + "/getLeaveRequests", {});
  }

  Leaverequest(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/LeaveRequest", id);
  }
  
 
  
  createOrUpdateLeaveRequest(leaverequest: LeaveRequest): Observable<DbResult> {
    leaverequest.lr_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateLeaveRequest", leaverequest);
  }

  approveLeaveRequest(requestParms: RequestParms): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/approveLeaveRequest`, requestParms, {});
  }

  rejectLeaveRequest(requestParms: RequestParms): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/rejectLeaveRequest`, requestParms, {});
  }

  deleteLeaveRequest(id: any) {
    return this.http.post<DbResult>(this.apiUrl + "/deleteLeaveRequest", id);
  }
  getLeaveRequest(id: any) {
    return this.http.post<LeaveRequest>(this.apiUrl + "/getLeaveRequest", id);
  }

  getLeaveRequestsForApprovals(requestParms: RequestParms): Observable<LeaveRequest[]> {
    return this.http.post<LeaveRequest[]>(this.apiUrl + "/getLeaveRequestsForApprovals", requestParms);
  }
  getApprovalHistory(lr_id:number): Observable<LeaveApprovalHistory[]> {
    return this.http.post<LeaveApprovalHistory[]>(this.apiUrl + "/getApprovalHistory", lr_id);
  }
  
  get refreshLeaveRequests$() {
    return this.refreshLeaveRequestsSubject.asObservable();
  }
  refreshLeaveRequests(): void {
    this.refreshLeaveRequestsSubject.next();
  }
}
