import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class ISupplierService {
  private apiUrl = `${environment.serverHostAddress}/api/Supplier`;
  private refreshSuppliersSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.post<Supplier[]>(this.apiUrl + "/getSuppliers", {});  
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl + "/getSupplier", id);  
  }

  deleteSupplier(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteSupplier", id); 
  }

  createOrUpdateSupplier(supplier: Supplier): Observable<DbResult> {
    supplier.s_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateSupplier", supplier); 
  }
  get refreshSuppliers$() {
    return this.refreshSuppliersSubject.asObservable();
  }
  refreshSuppliers(): void {
    this.refreshSuppliersSubject.next();
  }
}
