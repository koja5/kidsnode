import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-children',
  templateUrl: './all-children.component.html',
  styleUrls: ['./all-children.component.scss']
})
export class AllChildrenComponent implements OnInit {

  public path = '/grids/children';
  public file = 'all-children.json';

  constructor() { }

  ngOnInit(): void {
  }

}
