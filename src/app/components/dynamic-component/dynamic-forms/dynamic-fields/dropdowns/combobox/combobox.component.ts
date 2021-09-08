import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CallApiService } from 'src/app/services/call-api.service';
import { FieldConfig } from '../../../models/field-config';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.sass'],
})
export class ComboboxComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  public data: any;

  constructor(private callApi: CallApiService) {
    this.config = new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.config.data && this.config.data['translation']) {
      /*this.data =
        this.helpService.getLanguage()[
          this.config.data['translation']['property']
        ];*/
      this.config.field = this.config.data['translation']['fields'];
    } else {
      this.initialization();
    }
  }

  initialization() {
    if (this.config.request!.type === 'POST') {
    } else {
      this.getApiRequest();
    }
  }

  postApiRequest() {
    this.callApi.callPostMethod(
      this.config.request!.api,
      this.callApi.packParametarPost(
        this.config.data,
        this.config.request!.fields
      )
    );
  }

  getApiRequest() {
    this.callApi
      .callGetMethod(
        this.config.request!.api,
        this.callApi.packParametarGet(
          this.config.data,
          this.config.request!.fields
        )
      )
      .subscribe((data) => {
        if (this.config.request!.root) {
          // this.data = data[this.config.request!.root];
        } else {
          this.data = data;
        }
      });
  }
}
