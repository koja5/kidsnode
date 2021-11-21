import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public refreshGrid = new Subject<null>();

  constructor() {}

  sendRefreshGrid() {
    this.refreshGrid.next();
  }

  getRefreshGrid(): Observable<any> {
    return this.refreshGrid.asObservable();
  }
}
