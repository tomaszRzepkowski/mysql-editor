import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../model/connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  connectToDb(connectionData: Connection): Observable<any> {
    return this.httpClient.post('/api/connect', connectionData);
  }
}
