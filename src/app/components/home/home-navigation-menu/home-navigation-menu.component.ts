import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-home-navigation-menu',
  templateUrl: './home-navigation-menu.component.html',
  styleUrls: ['./home-navigation-menu.component.scss'],
})
export class HomeNavigationMenuComponent implements OnInit {
  @Input() color?: string;
  @Input() language: any;

  public navigationScroll = '';
  public navigationMobile = '';

  public chooseLang: any;
  public selectionLanguage: any;

  constructor(
    private helpService: HelpService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.selectionLanguage = this.helpService.getSelectionLangauge();

    this.configurationService
      .getConfiguration('/languages', 'choose-lang.json')
      .subscribe((data) => {
        this.chooseLang = data;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 0) {
      this.navigationScroll = 'affix';
    } else {
      this.navigationScroll = '';
    }
  }

  canvasNavigationMobile() {
    if (this.navigationMobile === '') {
      this.navigationMobile = 'show';
    } else {
      this.navigationMobile = '';
    }
  }

  changeLanguage(name: string) {
    this.selectionLanguage = name;
    this.helpService.setSelectionLanguage(name);
    this.configurationService
      .getLanguageForLanding(name)
      .subscribe((language) => {
        this.language = language;
        this.helpService.setLanguageForLanding(language);
      });
    // this.sendEventForChangingLanguage.emit(name);
  }
}
