import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  getTables(): Observable<any> {
    return this.httpClient.get('/api/info/tables');
  }

  getSchemas(): Observable<any> {
    return this.httpClient.get('/api/info/schemas');
  }

  selectSchema(schemaName: string): Observable<any> {
    return this.httpClient.put('/api/info/schema', null, {params: {schemaName}});
  }
}
