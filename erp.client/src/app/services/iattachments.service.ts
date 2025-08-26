import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';
import { Attachments } from '../models/attachments.model';

@Injectable({
  providedIn: 'root'
})
export class IAttachmentsService {
  private apiUrl = `${environment.serverHostAddress}/api/Attachments`;
  private refreshAttachmentsSubject = new Subject<void>();
 
  
  constructor(private http: HttpClient) { }

  getAttachments(): Observable<Attachments[]> {
    return this.http.post<Attachments[]>(this.apiUrl + "/getAttachments", {});  
  }

  getAttachment(id: number): Observable<Attachments> {
    return this.http.post<Attachments>(this.apiUrl + "/getAttachment", id);  
  }

  deleteAttachments(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteAttachments", id); 
  }

  createOrUpdateAttachments(attachments: Attachments): Observable<DbResult> {
    attachments.a_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateAttachments", attachments); 
  }

  onSubmit(attachments: Attachments): Observable<DbResult> {

    return this.http.post<DbResult>(this.apiUrl + "/onSubmit", attachments);
    
  }

  get refreshAttachments$() {
    return this.refreshAttachmentsSubject.asObservable();
  }
  
  refreshAttachments(): void {
    this.refreshAttachmentsSubject.next();
  }
}
