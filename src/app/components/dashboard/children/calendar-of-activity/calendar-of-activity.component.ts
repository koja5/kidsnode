import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-of-activity',
  templateUrl: './calendar-of-activity.component.html',
  styleUrls: ['./calendar-of-activity.component.scss'],
})
export class CalendarOfActivityComponent implements OnInit {
  public path = '/schedule';
  public file = 'calendar-of-activity-children.json';

  constructor() {}

  ngOnInit(): void {}
}
