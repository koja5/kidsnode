import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dynamic-action-button',
  templateUrl: './dynamic-action-button.component.html',
  styleUrls: ['./dynamic-action-button.component.scss']
})
export class DynamicActionButtonComponent implements OnInit {

  @Input() data: any;
  public language: any;
  public itemsModelDropDown!: ItemModel[];
  public itemsModelSplit!: ItemModel[];

  constructor(private helpService: HelpService) { }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initialize();
  }

  initialize() {
    if(this.data.dropDownButtons) {
      this.itemsModelDropDown = this.data.dropDownButtons.items as ItemModel[];
    }
    if(this.data.splitButtons) {
      this.itemsModelSplit = this.data.splitButtons.items as ItemModel[];
    }
  }

  clickAction(action: any) {
    console.log(action);
  }

}
