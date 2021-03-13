import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  getTables(schemaName: string): Observable<any> {
    return this.httpClient.get('/api/info/tables', {params: {schemaName}});
  }

  getSchemas(): Observable<any> {
    return this.httpClient.get('/api/info/schemas');
  }

  selectSchema(schemaName: string): Observable<any> {
    return this.httpClient.put('/api/info/schema', null, {params: {schemaName}});
  }

  getCurrentSchema(): Observable<any> {
    return this.httpClient.get('/api/info/schema',  { responseType: 'text'});
  }
}
