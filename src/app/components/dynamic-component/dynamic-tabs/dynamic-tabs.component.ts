import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { ConfigurationService } from 'src/app/services/configuration.service';

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
  public config: any;

  public headerText: any[] = [
    { text: 'Twitter', iconCss: 'e-twitter' },
    { text: 'Facebook', iconCss: 'e-facebook' },
    { text: 'WhatsApp', iconCss: 'e-whatsapp' },
  ];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.initializeConfig();
  }

  initializeConfig() {
    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        setTimeout(() => {
          this.tabObj.element.classList.add('e-fill');
        }, 50);
      });
  }
}
