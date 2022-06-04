import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public isMobile = false;
  public language: any;

  constructor(
    private helpService: HelpService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.helpService.checkMobileDevice();
    this.configurationService
      .getLanguageForLanding('serbian')
      .subscribe((langauge) => {
        this.language = langauge;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.helpService.checkMobileDevice();
  }
}
