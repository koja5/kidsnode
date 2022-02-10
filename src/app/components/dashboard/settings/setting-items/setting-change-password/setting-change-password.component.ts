import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-change-password',
  templateUrl: './setting-change-password.component.html',
  styleUrls: ['./setting-change-password.component.scss'],
})
export class SettingChangePasswordComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'change-password.json';
  constructor() {}

  ngOnInit(): void {}
}
