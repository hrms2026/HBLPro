import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ReleaseDocument } from '../models/release.document.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class IReleaseDocumentService {
  private apiUrl = `${environment.serverHostAddress}/api/ReleaseDocument`;
  private refreshUsersSubject = new Subject<void>();
 

  constructor(private http: HttpClient) { }

  getReleaseDocuments(requestParms:RequestParms): Observable<ReleaseDocument[]> {
    return this.http.post<ReleaseDocument[]>(`${this.apiUrl}/getReleaseDocuments`, requestParms);  
  }

  getReleaseDocument(id: number): Observable<ReleaseDocument> {
    return this.http.post<ReleaseDocument>(`${this.apiUrl}/getReleaseDocument`, id);  
  }
  deleteReleaseDocument(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/deleteReleaseDocument`, id, {}); 
  }
  receiveReleaseDocument(requestParms: RequestParms): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/receiveReleaseDocument`,requestParms, {}); 
  }

  createOrUpdateReleaseDocument(releasedocument: ReleaseDocument): Observable<DbResult> {
    releasedocument.rd_cre_date = new Date().toISOString();
    releasedocument.rd_released_date = new Date().toISOString();
    releasedocument.rd_received_date=new Date().toISOString();
    
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdateReleaseDocument`, releasedocument); 
  }

  get refreshUsers$() {
    return this.refreshUsersSubject.asObservable();
  }

  refreshReleaseDocument(): void {
    this.refreshUsersSubject.next();
  }

  
}
