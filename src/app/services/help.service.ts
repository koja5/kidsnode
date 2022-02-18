import { Injectable } from '@angular/core';
import { FileType } from '../enums/file-type';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UserType } from '../enums/user-type';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  helper = new JwtHelperService();

  constructor(private storageService: StorageService) {}

  public checkMobileDevice() {
    if (window.innerWidth < 992) {
      return true;
    } else {
      return false;
    }
  }

  getHeightForGridWithoutPx(partOfTab?: boolean) {
    let innerHeight = window.innerHeight;
    if (partOfTab) {
      innerHeight = Number(innerHeight - 297);
    } else {
      innerHeight = Number(innerHeight - 261);
    }

    if (this.getLocalStorageStringValue('orientation') === 'horizontal') {
      if (window.innerWidth > 992) {
        innerHeight = innerHeight - 60;
      } else {
        innerHeight = innerHeight - 20;
      }
    }
    return innerHeight;
  }

  getHeightForGrid() {
    if (window.innerWidth < 992) {
      return window.innerHeight - 71 + 'px';
    } else {
      return window.innerHeight - 60 + 'px';
    }
  }

  getHeightForSchedulerWithoutPx(partOfTab?: boolean) {
    let innerHeight = window.innerHeight;
    if (partOfTab) {
      innerHeight = Number(innerHeight - 108);
    } else {
      innerHeight = Number(innerHeight - 70);
    }

    if (this.getLocalStorageStringValue('orientation') === 'horizontal') {
      if (window.innerWidth > 992) {
        innerHeight = innerHeight - 70;
      } else {
        innerHeight = innerHeight - 20;
      }
    }
    return innerHeight;
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
    if (parameters) {
      for (let i = 0; i < parameters.length; i++) {
        value += data[parameters[i]] + '/';
      }
    }
    return value;
  }

  getValueFromUrl(data: any, parameters: string[]) {
    for (let i = 0; i < parameters.length; i++) {
      if (data[parameters[i]]) {
        return data[parameters[i]];
      }
    }
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

  getLocalStorageStringValue(key: string) {
    return localStorage.getItem(key);
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

  convertValueToSpecificType(value: any, type: string) {
    switch (type) {
      case 'number':
        return Number(value);
      case 'multiselect':
        return typeof value === 'string' ? value.split(',').map(Number) : value;
      default:
        return value;
    }
  }

  getFileTypeIcon(type: string) {
    switch (type) {
      case FileType.pdf:
        return 'picture_as_pdf';
      default:
        return 'description';
    }
  }

  checkForMobileLayout() {
    if (window.innerWidth > 992) {
      return false;
    } else {
      return true;
    }
  }

  getDecodeToken() {
    return this.helper.decodeToken(this.storageService.getToken()).user;
  }

  getTypeOfName(type: any) {
    for (var item in UserType) {
      if (Number(item) === type) {
        return UserType[item];
      }
    }
    return UserType[UserType.educator];
  }

  checkRights(rights: any) {
    const type = this.getTypeOfName(this.getDecodeToken().type);
    if (rights) {
      for (let i = 0; i < rights.length; i++) {
        if (rights[i] === type) {
          return true;
        }
      }
      return false;
    } else return true;
  }
}
