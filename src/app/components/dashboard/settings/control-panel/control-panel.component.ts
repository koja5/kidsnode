import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  private path = 'settings';
  private file = 'control-panel.json';
  public configuration: any;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.initConfiguration();
  }

  initConfiguration() {
    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.configuration = data;
      });
  }
}
