import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ILoginService } from './ilogin.service';
import { PurchaseOrder } from '../models/purchase.order.model';

@Injectable({
  providedIn: 'root'
})
export class IpurchaseOrderService {
  private apiUrl = `${environment.serverHostAddress}/api/PurchaseOrder`;
  private refreshPurchaseOrdersSubject = new Subject<void>();

  constructor(private http: HttpClient, private iLoginService: ILoginService) { }

  private getHttpHeaders(): HttpHeaders {
    const token = this.iLoginService.getToken(); // Retrieve the token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ensure token is correctly formatted and included
    });
  }

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    const headers = this.getHttpHeaders();
    return this.http.post<PurchaseOrder[]>(`${this.apiUrl}/getPurchaseOrders`, {}, { headers });  
  }

  getPurchaseOrder(id: number): Observable<PurchaseOrder> {
    const headers = this.getHttpHeaders();
    return this.http.post<PurchaseOrder>(`${this.apiUrl}/getPurchaseOrder`, id, { headers });  
  }

  deletePurchaseOrder(id: number): Observable<DbResult> {
    const headers = this.getHttpHeaders();
    return this.http.post<DbResult>(`${this.apiUrl}/deletePurchaseOrder`, id, { headers }); 
  }

  createOrUpdatePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<DbResult> {
    purchaseOrder.po_cre_date = new Date().toISOString();
    const headers = this.getHttpHeaders();
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdatePurchaseOrder`, purchaseOrder, { headers }); 
  }

  get refreshPurchaseOrders$() {
    return this.refreshPurchaseOrdersSubject.asObservable();
  }

  refreshPurchaseOrders(): void {
    this.refreshPurchaseOrdersSubject.next();
  }

  getCurrentUser(): User  {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      try {
        const user: User = JSON.parse(userJson);
        return user;
      } catch (error) {

        console.error('Failed to parse user data:', error);
        return new User(); // Return null or handle the error as needed
      }
    }
    return new User(); // Return null if no user data is found
  }
}
