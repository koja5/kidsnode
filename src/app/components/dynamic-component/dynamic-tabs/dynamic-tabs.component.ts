import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
  styleUrls: ['./dynamic-tabs.component.scss'],
})
export class DynamicTabsComponent implements OnInit {
  @ViewChild('element')
  tabObj!: TabComponent;
  @Input() path!: string;
  @Input() file!: string;
  public config: any = [];

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
  }

  initializeConfig() {
    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (this.helpService.checkRights(data[i].rights)) {
            this.config.push(data[i]);
          }
        }
        // this.config = data;
        setTimeout(() => {
          this.tabObj.element.classList.add('e-fill');
        }, 50);
      });
  }
}
