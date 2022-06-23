import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  private path = 'settings';
  private file = 'control-panel.json';
  public configuration: any;
  public language: any;

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.initConfiguration();
  }

  initConfiguration() {
    this.language = this.helpService.getLanguage();
    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.configuration = data;
      });
  }

  checkRights(rights: any) {
    return this.helpService.checkRights(rights);
  }
}
