import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';
import { Attendance } from '../models/Attendance.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class IAttendanceService {
  
  private apiUrl = `${environment.serverHostAddress}/api/Attendance`;
  private refreshAttendanceSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getAttendances(requestParms:RequestParms): Observable<Attendance[]> {
    return this.http.post<Attendance[]>(this.apiUrl + "/getAttendances", requestParms);  
  }

  punchAttendance(id:number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/punchAttendance", id); 
  }
  
  get refreshAttendance$() {
    return this.refreshAttendanceSubject.asObservable();
  }
  refreshAttendance(): void {
    this.refreshAttendanceSubject.next();
  }
}
