import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FieldConfig } from '../../../models/field-config';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  public language: any;

  constructor(private helpService: HelpService) {
    this.config =  new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

}
