import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-children-per-group',
  templateUrl: './children-per-group.component.html',
  styleUrls: ['./children-per-group.component.scss'],
})
export class ChildrenPerGroupComponent implements OnInit {
  
  public path = '/grids/children';
  public file = 'childrens-per-group.json';

  constructor() {}

  ngOnInit(): void {}
}
