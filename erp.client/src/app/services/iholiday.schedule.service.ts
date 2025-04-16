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

@Injectable({
  providedIn: 'root'
})
export class IHolidayScheduleService {



  private apiUrl = `${environment.serverHostAddress}/api/HolidaySchedule`;
  private refreshHolidayScheduleSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.post<Company[]>(this.apiUrl + "/getCompanies", {});
  }
  getHolidaySchedules(): Observable<HolidaySchedule[]> {
    return this.http.post<HolidaySchedule[]>(this.apiUrl + "/getHolidaySchedules", {});
  }

  HolidaySchedule(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/HolidaySchedule", id);
  }

  deleteHolidaySchedule(id: any) {
    return this.http.post<DbResult>(this.apiUrl + "/deleteHolidaySchedule", id);
  }
  getHolidaySchedule(id: any) {
    return this.http.post<HolidaySchedule>(this.apiUrl + "/getHolidaySchedule", id);
  }

  createOrUpdateHolidaySchedule(holidayschedule: HolidaySchedule): Observable<DbResult> {
    
    holidayschedule.hs_cre_date=new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateHolidaySchedule", holidayschedule);
  }
  calculateLeaveDays(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/HolidaySchedule", id);
  }
  get refreshHolidaySchedules$() {
    return this.refreshHolidayScheduleSubject.asObservable();
  }
  refreshHolidaySchedules(): void {
    this.refreshHolidayScheduleSubject.next();
  }
}
