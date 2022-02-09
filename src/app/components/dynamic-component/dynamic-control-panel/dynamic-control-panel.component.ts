import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dynamic-control-panel',
  templateUrl: './dynamic-control-panel.component.html',
  styleUrls: ['./dynamic-control-panel.component.scss'],
})
export class DynamicControlPanelComponent implements OnInit {
  @Input() path!: string;
  @Input() file!: string;
  public language: any;
  public config: any;
  public loader = true;
  public user = {
    name: '',
    type: '',
    typeName: '',
  };

  constructor(
    private helpService: HelpService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.getUserInfo();
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.loader = false;
      });
  }

  getUserInfo() {
    const token = this.helpService.getDecodeToken();
    this.user.name =
      (token.firstname ? token.firstname : '') +
      ' ' +
      (token.lastname ? token.lastname : '');
    this.user.type = token.type;
    this.user.typeName = this.language[
      this.helpService.getTypeOfName(token.type)
    ]
      ? this.language[this.helpService.getTypeOfName(token.type)]
      : this.helpService.getTypeOfName(token.type);
  }

  getTodayDate() {
    const date = new Date();
    return (
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      '.'
    );
  }
}
