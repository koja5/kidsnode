import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpService } from 'src/app/services/help.service';
import { FieldConfig } from '../../../models/field-config';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.sass']
})
export class TextBoxComponent implements OnInit {

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
