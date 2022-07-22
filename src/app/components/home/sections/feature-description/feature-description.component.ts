import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-description',
  templateUrl: './feature-description.component.html',
  styleUrls: ['./feature-description.component.scss'],
})
export class FeatureDescriptionComponent implements OnInit {
  @Input() language: any;
  @Input() isMobile!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
