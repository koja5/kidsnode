import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';
import { HelpService } from './services/help.service';

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

  constructor(
    private router: Router,
    private configurationService: ConfigurationService,
    private helpService: HelpService
  ) {}

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

    const selectionLanguage = this.helpService.getSelectionLangauge();
    this.configurationService
      .getLanguageForLanding(selectionLanguage ? selectionLanguage : 'serbia')
      .subscribe((language) => {
        this.helpService.setLanguageForLanding(language);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
      this.connectionStatus = '';
    });
  }
}
