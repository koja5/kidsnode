import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-diary',
  templateUrl: './work-diary.component.html',
  styleUrls: ['./work-diary.component.scss'],
})
export class WorkDiaryComponent implements OnInit {
  public path = 'scheduler/employee';
  public file = 'employee-work-diary.json';

  constructor() {}

  ngOnInit(): void {}
}
