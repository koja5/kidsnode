import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  public path = '/grids/parameters';
  public file = 'food.json';

  constructor() { }

  ngOnInit(): void {
  }

}
