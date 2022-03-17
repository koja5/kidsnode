import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-setting-kindergarden-profile',
  templateUrl: './setting-kindergarden-profile.component.html',
  styleUrls: ['./setting-kindergarden-profile.component.scss'],
})
export class SettingKindergardenProfileComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'kindergarden-profile.json';
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
  public logo: any;
  public language: any;

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initalizeData();
  }

  initalizeData() {
    this.apiService
      .callGetMethod('api/getKindergardenInfo', '')
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          if (data[0].logo) {
            this.apiService.getImage(data[0].logo).subscribe((data: any) => {
              this.createImageFromBlob(data);
            });
          } else {
            this.logo = './assets/icons/k_default.png';
          }
        }
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.logo = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
