import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html',
  styleUrls: ['./setting-general.component.scss'],
})
export class SettingGeneralComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'general.json';
  public config = {
    uploadConfig: {
      path: '/upload-config',
      file: 'upload-kindergarden-logo.json',
      delete: {
        type: 'POST',
        api: '/api/upload/deleteChildrenDocument',
        parameters: [],
        fields: '',
        root: '',
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
