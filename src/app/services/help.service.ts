import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor() {}

  public checkMobileDevice() {
    if (window.innerWidth < 992) {
      return true;
    } else {
      return false;
    }
  }

  getHeightForGridWithoutPx() {
    if (window.innerWidth > 992) {
      return Number(window.innerHeight - 320);
    } else {
      return Number(window.innerHeight - 345);
    }
  }

  getHeightForGrid() {
    if (window.innerWidth < 992) {
      return window.innerHeight - 71 + 'px';
    } else {
      return window.innerHeight - 60 + 'px';
    }
  }

  getHeightForSchedulerWithoutPx() {
    if (window.innerWidth < 992) {
      return Number(window.innerHeight - 125);
    } else {
      return Number(window.innerHeight - 120);
    }
  }

  concatenatePageLink(link: string, parameters: string[], data: any) {
    let parametersValue = '';
    for (let i = 0; i < parameters.length; i++) {
      parametersValue += data[parameters[i]] + '/';
    }
    if (link.endsWith('/')) {
      return link + parametersValue;
    } else {
      return link + '/' + parametersValue;
    }
  }

  getRequestDataParameters(data: any, parameters: string[]) {
    let value = '';
    for (let i = 0; i < parameters.length; i++) {
      value += data[parameters[i]] + '/';
    }
    return value;
  }

  postRequestDataParameters(body: any, data: any, parameters: string[]) {
    for (let i = 0; i < parameters.length; i++) {
      body[parameters[i]] = data[parameters[i]];
    }
    return body;
  }

  setLanguage(value: any) {
    localStorage.setItem(
      'language',
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLanguage() {
    if (localStorage.getItem('language')) {
      return JSON.parse(localStorage.getItem('language') ?? '{}');
    } else {
      return null;
    }
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '{}');
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getSessionStorage(key: string) {
    return JSON.parse(sessionStorage.getItem(key) ?? '{}');
  }

  removeSessionStorageItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
