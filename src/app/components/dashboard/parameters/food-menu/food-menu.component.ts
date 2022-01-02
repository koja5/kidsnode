import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})
export class FoodMenuComponent implements OnInit {

  public path = '/scheduler/parameter';
  public file = 'food-menu.json';

  constructor() { }

  ngOnInit(): void {
  }

}
