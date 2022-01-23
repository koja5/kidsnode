import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel-childrens',
  templateUrl: './control-panel-childrens.component.html',
  styleUrls: ['./control-panel-childrens.component.scss']
})
export class ControlPanelChildrensComponent implements OnInit {

  public path = '/control-panel';
  public file = 'children.json';

  constructor() { }

  ngOnInit(): void {
  }

}
