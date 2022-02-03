import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html',
  styleUrls: ['./setting-general.component.scss'],
})
export class SettingGeneralComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'general.json';

  constructor() {}

  ngOnInit(): void {}
}
