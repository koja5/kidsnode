import { Component, OnInit, ViewChild } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-label-list',
  templateUrl: './dynamic-label-list.component.html',
  styleUrls: ['./dynamic-label-list.component.scss'],
})
export class DynamicLabelListComponent implements OnInit {
  public modal = true;
  public config = {
    config: [
      {
        type: 'textbox',
        width: 'col-md-12 hide',
        class: 'e-outline',
        name: 'id',
        title: 'ID',
        field: 'id',
        readonly: true,
      },
      {
        type: 'textbox',
        width: 'col-md-12',
        class: 'e-outline',
        multiline: true,
        name: 'note',
        title: 'email',
        field: 'email',
      },
      {
        type: 'button',
        width: 'col-md-12',
        class: 'e-info button-action',
        name: 'submit',
        title: 'saveButton',
        field: 'submit',
        positionClass: 'position-end mt-3 col-md-12',
      },
    ],
  };

  constructor(private callApi: CallApiService) {}

  ngOnInit(): void {}

  initializeData() {}

  submitEmitter(event: any) {
    console.log(event);
  }
}
