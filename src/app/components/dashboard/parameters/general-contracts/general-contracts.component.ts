import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-contracts',
  templateUrl: './general-contracts.component.html',
  styleUrls: ['./general-contracts.component.scss'],
})
export class GeneralContractsComponent implements OnInit {

  public path = '/grids/parameters';
  public file = 'general-contracts.json';

  constructor() {}

  ngOnInit(): void {}
}
