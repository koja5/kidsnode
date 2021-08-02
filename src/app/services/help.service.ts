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
    return Number(window.innerHeight - 153);
  }

  getHeightForGrid() {
    if (window.innerWidth < 992) {
      return window.innerHeight - 71 + 'px';
    } else {
      return window.innerHeight - 60 + 'px';
    }
  }
}
