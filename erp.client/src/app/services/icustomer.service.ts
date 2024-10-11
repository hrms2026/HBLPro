import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ICustomerService {
  private apiUrl = `${environment.serverHostAddress}/api/Customer`;
  private refreshCustomersSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.post<Customer[]>(this.apiUrl + "/getCustomers", {});  
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + "/getCustomer", id);  
  }

  deleteCustomer(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCustomer", id); 
  }

  createOrUpdateCustomer(customer: Customer): Observable<DbResult> {
    customer.c_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCustomer", customer); 
  }
  get refreshCustomers$() {
    return this.refreshCustomersSubject.asObservable();
  }
  refreshCustomers(): void {
    this.refreshCustomersSubject.next();
  }
}
