import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-home-navigation-menu',
  templateUrl: './home-navigation-menu.component.html',
  styleUrls: ['./home-navigation-menu.component.scss'],
})
export class HomeNavigationMenuComponent implements OnInit {
  @Input() color?: string;
  @Input() language: any;
  @Output() sendEventForChangeLanguage: EventEmitter<any> = new EventEmitter();

  public navigationScroll = '';
  public navigationMobile = '';

  public chooseLang: any;
  public selectionLanguage: any;

  constructor(
    private helpService: HelpService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.configurationService.getAllLangs().subscribe((data) => {
      this.chooseLang = data;
      const selectionLanguage = this.helpService.getSelectionLangauge();
      this.getNameOfFlag(data, selectionLanguage);
      if (!this.selectionLanguage) {
        this.selectionLanguage = selectionLanguage;
      }
    });
  }

  getNameOfFlag(langs: any, selectionLanguage: any) {
    for (let i = 0; i < langs.length; i++) {
      for (let j = 0; j < langs[i].similarCode.length; j++) {
        if (langs[i].similarCode[j] === selectionLanguage) {
          this.selectionLanguage = langs[i].name;
          break;
        }
      }
    }
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

  changeLanguage(code: string, name: string) {
    this.selectionLanguage = name;
    this.helpService.setSelectionLanguage(code);
    this.configurationService
      .getLanguageForLanding(name)
      .subscribe((language) => {
        this.language = language;
        this.helpService.setLanguageForLanding(language);
        this.sendEventForChangeLanguage.emit(name);
      });
  }
}
