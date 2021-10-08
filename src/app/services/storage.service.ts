import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorageSimple(key: string) {
    return sessionStorage.getItem(key);
  }

  getSessionStorageObject(key: string) {
    return JSON.parse(JSON.stringify(sessionStorage.getItem(key)));
  }

  removeAllSessionStorage() {
    sessionStorage.clear();
  }

  removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
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

  removeAllLocalStorage() {
    localStorage.clear();
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  setToken(token: any) {
    this.cookieService.set('token', token, { expires: 1, path: '/', sameSite: 'Lax' });
  }

  getToken() {
    return this.cookieService.get('token');
  }

  deleteToken() {
    this.cookieService.delete('token', '/');
  }
}
