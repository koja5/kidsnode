import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.scss']
})
export class AllEmployeeComponent implements OnInit {

  public path = '/grids/employee';
  public file = 'all-employee.json';

  constructor() { }

  ngOnInit(): void {
  }

}
