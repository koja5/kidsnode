import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';
import { HelpService } from './services/help.service';
import { CallApiService } from './services/call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage!: string;
  connectionStatus!: string;
  public loader = false;

  constructor(
    private router: Router,
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private callApi: CallApiService
  ) {
    this.initializationLanguage();
  }

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.connectionStatus = '';
        setTimeout(() => {
          this.connectionStatus = 'online';
        }, 100);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatus = '';
        setTimeout(() => {
          this.connectionStatus = 'offline';
        }, 100);
      })
    );

    this.router.events.subscribe((evt) => {
      window.scrollTo(0, 0);
    });
  }

  initializationLanguage() {
    this.callApi.getUserLocation().subscribe(
      (data: any) => {
        if (
          data.location.country.code !== this.helpService.getSelectionLangauge()
        ) {
          this.loader = true;
          this.configurationService.getAllLangs().subscribe((langs) => {
            this.setLanguageByLocation(data.location.country, langs);
          });
        }
      },
      (error: any) => {
        this.getLanguageByCode('english', 'EN');
      }
    );
  }

  setLanguageByLocation(location: any, langs: any) {
    for (let i = 0; i < langs.length; i++) {
      for (let j = 0; j < langs[i].similarCode.length; j++) {
        if (langs[i].similarCode[j] === location.code) {
          this.getLanguageByCode(langs[i].name, location.code);
          break;
        }
      }
    }
  }

  getLanguageByCode(language: string, code: string) {
    this.configurationService
      .getLanguageForLanding(language)
      .subscribe((data) => {
        this.helpService.setLanguageForLanding(data);
        this.helpService.setSelectionLanguage(code);
        this.loader = false;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
      this.connectionStatus = '';
    });
  }
}
