import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ColumnsAndRows} from '../model/ColumnsAndRows';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private readonly API_INFO = '/api/info';
  private readonly API_TABLES = `${this.API_INFO}/tables`;
  private readonly API_SCHEMAS = `${this.API_INFO}/schemas`;

  constructor(private httpClient: HttpClient) { }

  getTables(schemaName: string): Observable<any> {
    return this.httpClient.get(this.API_TABLES, {params: {schemaName}});
  }

  getSchemas(): Observable<any> {
    return this.httpClient.get(this.API_SCHEMAS);
  }

  selectSchema(schemaName: string): Observable<any> {
    return this.httpClient.put(`${this.API_INFO}/schema`, null, {params: {schemaName}});
  }

  getCurrentSchema(): Observable<any> {
    return this.httpClient.get(`${this.API_INFO}/schema`,  { responseType: 'text'});
  }

  getColumns(schemaName: string, tableName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_TABLES}/columns`,  {params: {schemaName, tableName}});
  }

  getIndexes(schemaName: string, tableName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_TABLES}/indexes`,  {params: {schemaName, tableName}});
  }

  getTriggers(schemaName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_TABLES}/triggers`,  {params: {schemaName}});
  }

  getViews(schemaName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_SCHEMAS}/views`,  {params: {schemaName}});
  }

  getProcedures(schemaName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_SCHEMAS}/procedures`,  {params: {schemaName}});
  }

  getFunctions(schemaName: string): Observable<ColumnsAndRows> {
    return this.httpClient.get<ColumnsAndRows>(`${this.API_SCHEMAS}/functions`,  {params: {schemaName}});
  }
}
