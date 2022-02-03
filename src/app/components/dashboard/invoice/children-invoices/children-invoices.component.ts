import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-children-invoices',
  templateUrl: './children-invoices.component.html',
  styleUrls: ['./children-invoices.component.scss'],
})
export class ChildrenInvoicesComponent implements OnInit {
  public path = '/tabs/invoices';
  public file = 'children-invoices.json';

  constructor() {}

  ngOnInit(): void {}
}
