import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-places',
  templateUrl: './work-places.component.html',
  styleUrls: ['./work-places.component.scss']
})
export class WorkPlacesComponent implements OnInit {

  public path = '/grids/parameters';
  public file = 'work-places.json';

  constructor() { }

  ngOnInit(): void {
  }

}
