import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public collapseMenuItems: Array<string> = [];

  constructor() { 
    this.initialCollapseMenu();
  }

  ngOnInit(): void {
  }

  initialCollapseMenu() {
    for(let i = 0; i < 10; i++) {
      this.collapseMenuItems[i] = '';
    }
  }

  collapseMenu(i: number) {
    if(this.collapseMenuItems[i] === '') {
      this.collapseMenuItems[i] = 'show';
    } else {
      this.collapseMenuItems[i] = '';
    }
  }

}
