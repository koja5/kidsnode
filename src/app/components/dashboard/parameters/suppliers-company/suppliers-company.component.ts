import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-company',
  templateUrl: './suppliers-company.component.html',
  styleUrls: ['./suppliers-company.component.scss'],
})
export class SuppliersCompanyComponent implements OnInit {
  public path = '/grids/parameters';
  public file = 'suppliers-company.json';

  constructor() {}

  ngOnInit(): void {}
}
