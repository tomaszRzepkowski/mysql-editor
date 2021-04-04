import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {ActionParameters, ActionResponse} from '../model/Actions';
import {ResponseMapper} from '../shared/response-mapper';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

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
}
