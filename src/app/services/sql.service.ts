import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ColumnsAndRows} from '../model/ColumnsAndRows';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private httpClient: HttpClient) { }

  executeSQL(sql: string): Observable<any> {
    return this.httpClient.get<ColumnsAndRows>('/api/execute', {params: {sql}});
  }
}
