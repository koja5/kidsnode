import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-suppliers',
  templateUrl: './invoice-suppliers.component.html',
  styleUrls: ['./invoice-suppliers.component.scss'],
})
export class InvoiceSuppliersComponent implements OnInit {
  public path = '/grids/parameters';
  public file = 'invoice-suppliers.json';

  constructor() {}

  ngOnInit(): void {}
}
