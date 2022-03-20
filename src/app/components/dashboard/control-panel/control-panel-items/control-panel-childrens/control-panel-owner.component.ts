import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel-owner',
  templateUrl: './control-panel-owner.component.html',
  styleUrls: ['./control-panel-owner.component.scss']
})
export class ControlPanelOwnerComponent implements OnInit {

  public path = '/control-panel';
  public file = 'owner.json';

  constructor() { }

  ngOnInit(): void {
  }

}
