import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  public config: FieldConfig;
  public group: FormGroup;

  constructor() { 
    this.config =  new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit(): void {
  }

}
