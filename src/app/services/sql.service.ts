import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {ActionParameters, ActionResponse} from '../model/Actions';
import {ResponseMapper} from '../shared/response-mapper';
import {Pair} from '../model/pair';

@Injectable({
  providedIn: 'root'
})
export class SqlService {
  dataLoaded = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  executeSQL(sql: string): Observable<any> {
    return this.httpClient.get<ColumnsAndRows>('/api/execute', {params: {sql}});
  }

  prepareSQLForAction(parameters: ActionParameters): Observable<ActionResponse> {
    const paramArr = ResponseMapper.objectToArray(parameters);
    let httpParams = new HttpParams();
    paramArr.map(pair => {
      httpParams = httpParams.append(pair.key, pair.value);
    });
    return this.httpClient.get<ActionResponse>('/api/execute/actions', {params: httpParams});
  }

  executeSQLAction(parameters: ActionParameters): Observable<ActionResponse> {
    const paramArr = ResponseMapper.objectToArray(parameters);
    let httpParams = new HttpParams();
    paramArr.map(pair => {
      if (pair.value !== undefined) {
        httpParams =  httpParams.append(pair.key, pair.value);
      }
    });
    return this.httpClient.get<ActionResponse>('/api/execute/actions', {params: httpParams});
  }

  insertSQL(schema: string, table: string, pairs: Pair[]): Observable<any> {
    return this.httpClient.post<ActionResponse>('/api/execute/insert', pairs, {params: {schema, table}});
  }
}
