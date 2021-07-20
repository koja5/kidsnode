import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }

  public checkMobileDevice() {
    if(window.innerWidth < 992) {
      return true;
    } else {
      return false;
    }
  }
}
