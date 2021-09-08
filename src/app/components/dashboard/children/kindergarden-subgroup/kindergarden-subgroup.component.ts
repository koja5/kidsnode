import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kindergarden-subgroup',
  templateUrl: './kindergarden-subgroup.component.html',
  styleUrls: ['./kindergarden-subgroup.component.scss']
})
export class KindergardenSubgroupComponent implements OnInit {

  public path = '/grids/children';
  public file = 'kindergarden-subgroup.json';

  constructor() { }

  ngOnInit(): void {
  }

}
