import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-setting-owner-profile',
  templateUrl: './setting-owner-profile.component.html',
  styleUrls: ['./setting-owner-profile.component.scss'],
})
export class SettingOwnerProfileComponent implements OnInit {
  public path = '/settings/setting-items';
  public file = 'owner-profile.json';
  public config = {
    uploadConfig: {
      path: '/upload-config',
      file: 'upload-owner-profile-icon.json',
    },
  };
  public logo: any;
  public language: any;

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initalizeData();

    this.messageService.getRefreshGrid().subscribe((data) => {
      this.initalizeData();
    });
  }

  initalizeData() {
    this.apiService
      .callGetMethod('api/getOwnerInfo', '')
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          if (data[0].logo) {
            this.helpService.setLocalStorage('logo', data[0].logo);
            this.apiService.getImage(data[0].logo).subscribe((data: any) => {
              this.createImageFromBlob(data);
            });
          } else {
            this.logo = './assets/icons/k_owner.png';
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
