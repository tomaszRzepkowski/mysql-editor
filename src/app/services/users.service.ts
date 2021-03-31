import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {DBUserData} from '../model/DBUserData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get<ColumnsAndRows>('/api/users');
  }

  getUserData(username: string): Observable<any> {
    return this.httpClient.get<DBUserData>('/api/users/info', {params: {username}});
  }

  updateUser(dbUserData: DBUserData): Observable<DBUserData> {
    return this.httpClient.put<DBUserData>('/api/users', dbUserData);
  }

  createUser(dbUserData: DBUserData): Observable<DBUserData> {
    return this.httpClient.post<DBUserData>('/api/users', dbUserData);
  }

  deleteUser(host: string, username: string): Observable<any> {
    return this.httpClient.delete<DBUserData>('/api/users', {params: {host, username}});
  }
}
