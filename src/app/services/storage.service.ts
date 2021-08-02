import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSessionStorage(key:string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorageSimple(key: string) {
    return sessionStorage.getItem(key);
  }

  getSessionStorageObject(key: string) {
    return JSON.parse(JSON.stringify(sessionStorage.getItem(key)));
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorageSimple(key: string) {
    return localStorage.getItem(key);
  }

  getLocalStorageObject(key: string) {
    return JSON.parse(JSON.stringify(localStorage.getItem(key)));
  }
}
