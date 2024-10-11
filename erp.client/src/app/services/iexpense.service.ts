import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Expense } from '../models/expense.model'; // Update import to use Expense
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IExpenseService { // Update service name to ExpenseService
  private apiUrl = `${environment.serverHostAddress}/api/Expense`;
  private refreshExpensesSubject = new Subject<void>(); // Update Subject name
  
  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.post<Expense[]>(`${this.apiUrl}/getExpenses`, {});
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/getExpense`, id);
  }

  deleteExpense(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/deleteExpense`, id);
  }

  createOrUpdateExpense(expense: Expense): Observable<DbResult> {
    expense.e_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdateExpense`, expense);
  }

  get refreshExpenses$() {
    return this.refreshExpensesSubject.asObservable();
  }

  refreshExpenses(): void {
    this.refreshExpensesSubject.next();
  }
}
