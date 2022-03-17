import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-personalize',
  templateUrl: './setting-personalize.component.html',
  styleUrls: ['./setting-personalize.component.scss'],
})
export class SettingPersonalizeComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'personalize.json';
  constructor() {}

  ngOnInit(): void {}

  submitEmitter(event: string) {
    console.log(event);
  }
}
