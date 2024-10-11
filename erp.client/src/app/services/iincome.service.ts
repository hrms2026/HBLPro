import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Income } from '../models/income.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IIncomeService { 
  private apiUrl = `${environment.serverHostAddress}/api/Income`;
  private refreshIncomesSubject = new Subject<void>(); 
  
  constructor(private http: HttpClient) { }

  getIncomes(): Observable<Income[]> {
    return this.http.post<Income[]>(`${this.apiUrl}/getIncomes`, {});
  }

  getIncome(id: number): Observable<Income> {
    return this.http.post<Income>(`${this.apiUrl}/getIncome`, id);
  }

  deleteIncome(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/deleteIncome`, id);
  }

  createOrUpdateIncome(income: Income): Observable<DbResult> {
    income.i_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdateIncome`, income);
  }

  get refreshIncomes$() {
    return this.refreshIncomesSubject.asObservable();
  }

  refreshIncomes(): void {
    this.refreshIncomesSubject.next();
  }
}
