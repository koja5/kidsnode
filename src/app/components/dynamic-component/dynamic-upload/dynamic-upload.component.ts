import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  UploaderModule,
  UploadingEventArgs,
} from '@syncfusion/ej2-angular-inputs';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { getUniqueID } from '@syncfusion/ej2-base';
import { UploaderModel } from 'src/app/models/uploader-model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { MessageService } from 'src/app/services/message.service';
import { FieldConfig } from '../dynamic-forms/models/field-config';

@Component({
  selector: 'app-dynamic-upload',
  templateUrl: './dynamic-upload.component.html',
  styleUrls: ['./dynamic-upload.component.scss'],
})
export class DynamicUploadComponent implements OnInit {
  @ViewChild('tabObj')
  tabObj!: TabComponent;
  @Input() path!: string;
  @Input() file!: string;
  public config!: UploaderModel;
  public asyncSettings!: Object;
  public language: any;
  public basicData: any;
  public loader = false;
  public title = {
    text: "<div class='center-text'><mat-icon class='mat-icon notranslate material-icons mat-icon-no-color mr-1'>info</mat-icon> Osnovne informacije</div>",
  };
  public title2 = {
    text: "<div class='center-text'><mat-icon class='mat-icon notranslate material-icons mat-icon-no-color mr-1'>description</mat-icon> Dokumentacija</div>",
  };

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private messageService: MessageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.initializeConfig();
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.loader = false;
        this.config = data;
        if (this.config.config) {
          setTimeout(() => {
            this.tabObj.element.classList.add('e-fill');
            if (this.config.requiredBaseData) {
              this.tabObj.enableTab(1, false);
            }
          }, 50);
        }
        this.initializeSettings();
      });
  }

  initializeSettings() {
    this.asyncSettings = {
      saveUrl: this.config.saveUrl,
      removeUrl: this.config.removeUrl,
    };
  }

  public onUploadBegin(args: UploadingEventArgs) {
    let newName: string = getUniqueID(
      args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))
    );
    args.customFormData = [
      {
        fileName: newName,
      },
      {
        additionalData: this.basicData ? JSON.stringify(this.basicData) : '',
      },
      {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJraW5kZXJnYXJkZW4iOjJ9LCJpYXQiOjE2NDI2MzQ2MzYsImV4cCI6MTY0MjY3NzgzNn0.MZwx8y9W-BAaJy59CrCb53fSHd7NAsDudIJR-3JrIrQ"
      }
    ];
    if (this.config.url) {
      const dataValue = this.helpService.getValueFromUrl(
        this.router.snapshot.params,
        this.config.url
      );

      args.customFormData.push({ id: dataValue });
    }
    this.messageService.sendRefreshGrid();
  }

  submitEmitter(event: any) {
    this.basicData = event;
    this.tabObj.select(1);
  }

  backToInfoData() {
    this.tabObj.select(0);
  }
}
