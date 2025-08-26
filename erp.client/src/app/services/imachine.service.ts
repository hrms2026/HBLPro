
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';
import { Attendance } from '../models/Attendance.model';
import { RequestParms } from '../models/requestParms';
import { Machine } from '../models/machine.model';


@Injectable({
  providedIn: 'root'
})
export class IMachineService {
  
 
  private apiUrl = `${environment.serverHostAddress}/api/Machine`;
  private refreshMachineSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getMachines(): Observable<Machine[]> {
    return this.http.post<Machine[]>(this.apiUrl + "/getMachines",{});  
  }
  getMachine(id: number): Observable<Machine> {
      return this.http.post<Machine>(this.apiUrl + "/getMachine", id);  
    }
  
    deleteMachine(id: number): Observable<DbResult> {
      return this.http.post<DbResult>(this.apiUrl + "/deleteMachine", id); 
    }

  createMachine(id:number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createMachine", id); 
  }
  createOrUpdateMachine(machine:Machine): Observable<DbResult> {
    machine.m_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateMachine", machine); 
  }
  get refreshMachine$() {
    return this.refreshMachineSubject.asObservable();
  }
  refreshMachine(): void {
    this.refreshMachineSubject.next();
  }
}
