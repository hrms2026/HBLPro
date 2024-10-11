import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { MasterData } from '../models/master.data.model';
import { MasterType } from '../models/master.type.model';
import { RequestParms } from '../models/requestParms';


@Injectable({
  providedIn: 'root'
})
export class IMasterDataService {
  private apiUrl = `${environment.serverHostAddress}/api/MasterData`;
  private refreshMasterDatasSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getMasterDatas(): Observable<MasterData[]> {
    return this.http.post<MasterData[]>(this.apiUrl + "/getMasterDatas", {});  
  }

  getMasterData(id: number): Observable<MasterData> {
    return this.http.post<MasterData>(this.apiUrl + "/getMasterData", id);  
  }

  deleteMasterData(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteMasterData", id); 
  }

  getMasterDataTypes(): Observable<MasterType[]> {
    return this.http.post<MasterType[]>(`${this.apiUrl}/getMasterDataTypes`, {});  
  }
  createOrUpdateMasterData(masterData: MasterData): Observable<DbResult> {
    masterData.md_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateMasterData", masterData); 
  }

  getMasterDatasByType(requestParms :RequestParms): Observable<MasterData[]> {
    return this.http.post<MasterData[]>(this.apiUrl + "/getMasterDatasByType", requestParms);  
  }

  get refreshMasterDatas$() {
    return this.refreshMasterDatasSubject.asObservable();
  }
  refreshMasterDatas(): void {
    this.refreshMasterDatasSubject.next();
  }
}
