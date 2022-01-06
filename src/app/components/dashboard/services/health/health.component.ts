import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  public path = '/services';
  public file = 'health.json';

  constructor() { }

  ngOnInit(): void {
  }

}
