import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportParm } from '../models/report.parm.model';

@Injectable({
  providedIn: 'root'
})
export class IReportService {

  private apiUrl = `${environment.serverHostAddress}/api/Report`;
  constructor(private http: HttpClient) { }

  getAttandanceReport(reportParms: ReportParm): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/getAttandanceReport`, reportParms);  
  }
 
}
