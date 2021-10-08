import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private storageService: StorageService) {}

  public get getToken() {
      return {
        'x-access-token': this.storageService.getToken()?.split("\"").join("") + ""
      };
  }
}
