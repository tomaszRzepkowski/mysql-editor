import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeInSession(key: string, o: object): void {
    console.log(JSON.stringify(o));
    sessionStorage.setItem(key, JSON.stringify(o));
  }

  getFromSession<T>(key: string): T {
    const item = sessionStorage.getItem(key);
    return JSON.parse(item) as T;
  }
}
