import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.scss']
})
export class ProfileEmployeeComponent implements OnInit {

  public path = '/tabs/employee';
  public file = 'profile-employee.json';

  constructor() { }

  ngOnInit(): void {
  }

}
