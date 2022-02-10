import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HelpService } from '../help.service';

@Injectable({
  providedIn: 'root',
})
export class UserTypeGuardService {
  constructor(private router: Router, private helpService: HelpService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.helpService.getDecodeToken();
    const typeOfName = this.helpService.getTypeOfName(token.type);
    if (route.data.roles && route.data.roles.length) {
      for (let i = 0; i < route.data.roles.length; i++) {
        if (route.data.roles[i] === typeOfName) {
          return true;
        }
      }
    }
    this.router.navigate(['/not-found']);
    return false;
  }
}
