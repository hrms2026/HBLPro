import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ICategoryService {
  private apiUrl = `${environment.serverHostAddress}/api/Category`;
  private refreshCategoriesSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.post<Category[]>(this.apiUrl + "/getCategories", {});  
  }

  getCategory(id: number): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + "/getCategory", id);  
  }

  deleteCategory(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCategory", id); 
  }

  createOrUpdateCategory(category: Category): Observable<DbResult> {
    category.ct_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCategory", category); 
  }
  get refreshCategories$() {
    return this.refreshCategoriesSubject.asObservable();
  }
  refreshCategories(): void {
    this.refreshCategoriesSubject.next();
  }
}
