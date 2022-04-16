import { Component, HostListener, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public isMobile = false;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.isMobile = this.helpService.checkMobileDevice();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = this.helpService.checkMobileDevice();
  }
}
