import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  UploaderModule,
  UploadingEventArgs,
} from '@syncfusion/ej2-angular-inputs';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { getUniqueID } from '@syncfusion/ej2-base';
import { UploaderModel } from 'src/app/models/uploader-model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
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
    private helpService: HelpService
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
        setTimeout(() => {
          this.tabObj.element.classList.add('e-fill');
        }, 50);
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
        additionalData: this.basicData ? this.basicData : null,
      },
    ];
  }

  submitEmitter(event: any) {
    this.basicData = event;
    this.tabObj.select(1);
  }

  backToInfoData() {
    this.tabObj.select(0);
  }
}
