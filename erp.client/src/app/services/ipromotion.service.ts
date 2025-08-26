import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { Designation } from '../models/desigation.model';
import { Promotion } from '../models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class IPromotionService {
  private apiUrl = `${environment.serverHostAddress}/api/Promotion`;
  private refreshPromotionsSubject = new Subject<void>();

 
  
  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.post<Promotion[]>(this.apiUrl + "/getPromotions", {});  
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl + "/getPromotion", id);  
  }

  deletePromotion(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deletePromotion", id); 
  }
  CreatePromotion(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/Promotion", id);
  }

  createOrUpdatePromotion(promotion: Promotion): Observable<DbResult> {
    promotion.p_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdatePromotion",promotion); 
  }
  get refreshPromotions$() {
    return this.refreshPromotionsSubject.asObservable();
  }
  
  refreshPromotions(): void {
    this.refreshPromotionsSubject.next();
  }
}
