import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-of-work',
  templateUrl: './type-of-work.component.html',
  styleUrls: ['./type-of-work.component.scss']
})
export class TypeOfWorkComponent implements OnInit {

  public path = '/grids/parameters';
  public file = 'type-of-work.json';

  constructor() { }

  ngOnInit(): void {
  }

}
