import { Component, HostListener, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public collapseMenuItems: Array<string> = [];
  public transformContainerPosition = 'transform: translate3d(0px, 0px, 0px)';
  public sidebarClass = 'collapse-show';
  public mobileSidebarClass = 'display-none';
  public username!: any;
  public profileInfo = '';
  public menu: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileForSidebar();
  }

  public configField = {
    additionalInfo: {
      title: 'Basic Information',
      text: 'Edit your account details and settings.',
    },
    config: [
      {
        type: 'password',
        width: 'col-md-12',
        name: 'oldPassword',
        label: 'changePasswordOldPassword',
        field: 'oldPassword',
        value: '12345',
      },
      {
        type: 'password',
        width: 'col-md-6',
        name: 'newPassword',
        label: 'changePasswordNewPassword',
        field: 'newPassword',
      },
      {
        type: 'password',
        width: 'col-md-6',
        name: 'repeteNewPassword',
        label: 'changePasswordRepeteNewPassword',
        field: 'repeteNewPassword',
      },
      {
        type: 'button',
        width: 'col-md-12',
        class: 'e-info',
        name: 'submit',
        label: 'changePasswordButton',
        field: 'submit',
        positionClass: 'position-end mt-3 col-md-12',
      },
    ],
  };

  constructor(
    private helpService: HelpService,
    private storageService: StorageService,
    private configurationService: ConfigurationService,
    private callApi: CallApiService
  ) {
    this.initialCollapseMenu();
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.initializeConfigurations();
  }

  initialCollapseMenu() {
    this.checkMobileForSidebar();
    for (let i = 0; i < 10; i++) {
      this.collapseMenuItems[i] = '';
    }
  }

  initializeConfigurations() {
    this.configurationService
      .getConfiguration('/navigation-menu', 'navigation-menu.json')
      .subscribe((data) => {
        this.menu = data;
      });
  }

  checkMobileForSidebar() {
    if (!this.helpService.checkMobileDevice()) {
      this.mobileSidebarClass = '';
    }
  }

  collapseSidebar() {
    if (window.innerWidth > 992) {
      if (this.sidebarClass === '') {
        this.sidebarClass = 'collapse-show';
        this.transformContainerPosition = 'transform0';
      } else {
        this.sidebarClass = '';
        this.transformContainerPosition = 'transform-128';
      }
    } else {
      if (this.mobileSidebarClass === '') {
        this.mobileSidebarClass = 'display-none';
      } else {
        this.mobileSidebarClass = '';
      }
    }
  }

  collapseMenu(i: number) {
    if (this.collapseMenuItems[i] === '') {
      this.collapseMenuItems[i] = 'show';
    } else {
      this.collapseMenuItems[i] = '';
    }
  }

  getUserInfo() {
    this.username = this.storageService.getLocalStorageSimple('username');
  }

  myProfileInfo() {
    if (this.profileInfo === '') {
      this.profileInfo = 'show';
    } else {
      this.profileInfo = '';
    }
  }
}
