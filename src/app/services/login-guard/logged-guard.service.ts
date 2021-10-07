import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuardService {
  constructor(private router: Router, public storageService: StorageService) {}

  canActivate() {
    if (this.storageService.getLocalStorageSimple('token')) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
