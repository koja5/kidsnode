import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kindergarden-group',
  templateUrl: './kindergarden-group.component.html',
  styleUrls: ['./kindergarden-group.component.scss']
})
export class KindergardenGroupComponent implements OnInit {

  public path = '/grids';
  public file = 'kindergarden-group.json';

  constructor() { }

  ngOnInit(): void {
  }

}
