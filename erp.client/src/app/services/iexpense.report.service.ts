import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Expense } from '../models/expense.model'; // Update import to use Expense
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ExpenseReportParm } from '../models/expense.report.parms.model';

@Injectable({
  providedIn: 'root'
})
export class IExpenseReportService { // Update service name to ExpenseService
  private apiUrl = `${environment.serverHostAddress}/api/Expense`;
  private refreshExpensesSubject = new Subject<void>(); // Update Subject name
  
  constructor(private http: HttpClient) { }

  getExpenseReport(expenseReportParms: ExpenseReportParm): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(`${this.apiUrl}/getExpenseReport`, expenseReportParms);  
  }
  get refreshExpenses$() {
    return this.refreshExpensesSubject.asObservable();
  }

  refreshExpenses(): void {
    this.refreshExpensesSubject.next();
  }
}
