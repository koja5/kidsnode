import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(private router: Router, public storageService: StorageService) {}

  canActivate() {
    if (this.storageService.getLocalStorageSimple('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
