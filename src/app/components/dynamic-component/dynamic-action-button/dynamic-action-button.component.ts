import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { HelpService } from 'src/app/services/help.service';
import { FormConfig } from '../dynamic-forms/models/form-config';

@Component({
  selector: 'app-dynamic-action-button',
  templateUrl: './dynamic-action-button.component.html',
  styleUrls: ['./dynamic-action-button.component.scss'],
})
export class DynamicActionButtonComponent implements OnInit {
  @Input() data: any;
  @Input() config!: FormConfig;
  @Input() componentType!: string;
  public language: any;
  public itemsModelDropDown!: ItemModel[];
  public itemsModelSplit!: ItemModel[];
  public modal: boolean = false;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initialize();
  }

  initialize() {
    if (this.config?.actionButtons.dropDownButtons) {
      this.itemsModelDropDown = this.config?.actionButtons.dropDownButtons
        .items as ItemModel[];
    }
    if (this.config?.actionButtons.splitButtons) {
      this.itemsModelSplit = this.config?.actionButtons.splitButtons
        .items as ItemModel[];
    }
  }

  clickAction(action: any) {
    console.log(action);
    console.log(action.item.properties.id);
    switch (action.item.properties.id) {
      case 'edit':
        this.modal = true;
        break;
      case 'delete':
        this.modal = true;
        break;
    }
  }

  checkComponentType() {
    switch (this.componentType) {
      case 'form':
        return true;
      case 'scheduler':
        return true;
      default:
        return false;
    }
  }
}
