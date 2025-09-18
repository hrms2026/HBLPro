import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportParm } from '../models/report.parm.model';

@Injectable({
  providedIn: 'root'
})
export class IReportIncentiveService {

  private apiUrl = `${environment.serverHostAddress}/api/ReportIncentive`;
  constructor(private http: HttpClient) { }

  getIncentiveReport(reportParms: ReportParm): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/getIncentiveReport`, reportParms);  
  }
   
 
}
