import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-navigation-menu',
  templateUrl: './home-navigation-menu.component.html',
  styleUrls: ['./home-navigation-menu.component.scss'],
})
export class HomeNavigationMenuComponent implements OnInit {
  @Input() color?: string;

  public navigationScroll = '';
  public navigationMobile = '';

  constructor() {}

  ngOnInit(): void {}

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
}
