import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { CurrentActiveNodeModel } from 'src/app/models/navigation-menu/current-active-node-model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public collapseMenuItems: string[][] = [];
  public activeParentNode: string[][] = [];
  public activeChildrenNode: string[][][] = [];
  public dropDownNavigationMenu: string[] = [];
  public currentActiveNode: CurrentActiveNodeModel = {
    group: 0,
    parent: 0,
    children: 0,
  };
  public transformContainerPosition = 'transform: translate3d(0px, 0px, 0px)';
  public sidebarClass = '';
  public profileUser = '';
  public mobileSidebarClass = 'display-none';
  public username!: any;
  public profileInfo = '';
  public menu: any;

  public sidebar = '';
  public sidebarMobile = '';
  public profile = '';
  public language: any;
  public allThemes: any;
  public allLanguage: any;
  public imagePath: any = '../../../assets/images/users/defaultUser.png';
  public selectedNode = 'calendar';
  public typeOfDesign = 'vertical';
  public user: any;
  public pathFromUrl: any;
  public subMenuInd = '';
  public sidebarHeight: any;
  public permissionPatientMenu: any;
  public showHideCollapse = [];
  public activeGroup = [];
  public height!: string;
  public layoutOrientation = 'vertical';
  public horizontalSideBar = '';
  public mobile = false;
  public items: ItemModel[] = [
    {
      text: 'Settings',
      id: 'settings',
      iconCss: 'e-icons e-settings'
    },
    {
      separator: true,
    },
    {
      text: 'Logout',
      id: 'logout',
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileForSidebar();
    this.mobile = this.helpService.checkForMobileLayout();
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkInitialLayoutSettings();
    this.getUserInfo();
    this.initializeConfigurations();
  }

  checkInitialLayoutSettings() {
    this.height = this.helpService.getHeightForGrid();
    this.mobile = this.helpService.checkForMobileLayout();
    this.sidebarHeight = window.innerHeight - 60 + 'px';
    if (this.storageService.getLocalStorageSimple('sidebar')) {
      this.sidebar = this.storageService.getLocalStorageSimple('sidebar') ?? '';
    }
    this.helpService.setLocalStorage('orientation', this.layoutOrientation);
  }

  initialCollapseMenu() {
    this.checkMobileForSidebar();
    for (let i = 0; i < this.menu.length; i++) {
      this.collapseMenuItems[i] = [];
      this.activeParentNode[i] = [];
      this.activeChildrenNode[i] = [];
      for (let j = 0; j < this.menu[i].menu.length; j++) {
        this.collapseMenuItems[i][j] = '';
        this.activeParentNode[i][j] = '';
        if (this.menu[i].menu[j].isDefault) {
          this.activeParentNode[i][j] = 'mm-active';
          this.currentActiveNode = { group: i, parent: j, children: 0 };
        }
        if (this.menu[i].menu[j].children) {
          this.activeChildrenNode[i][j] = [];
          for (let k = 0; k < this.menu[i].menu[j].children.length; k++) {
            this.activeChildrenNode[i][j][k] = '';
            if (this.menu[i].menu[j].children[k].isDefault) {
              this.activeChildrenNode[i][j][k] = 'mm-active';
              this.currentActiveNode = { group: i, parent: j, children: k };
            }
          }
        }
      }
    }
  }

  initializeConfigurations() {
    this.configurationService
      .getConfiguration('/navigation-menu', 'navigation-menu.json')
      .subscribe((data) => {
        this.menu = data;
        this.initialCollapseMenu();
      });
  }

  checkMobileForSidebar() {
    if (!this.helpService.checkMobileDevice()) {
      this.mobileSidebarClass = '';
    }
  }

  collapseSidebar() {
    if (this.sidebarClass === '') {
      this.sidebarClass = 'sidebar-enable vertical-collpsed';
    } else {
      this.sidebarClass = '';
    }
  }

  collapseHorizontalSidebar() {
    if (this.horizontalSideBar === '') {
      this.horizontalSideBar = 'show';
    } else {
      this.horizontalSideBar = '';
    }
  }

  collapseMenu(i: number, j: number) {
    if (this.collapseMenuItems[i][j] === '') {
      this.collapseMenuItems[i][j] = 'mm-show';
    } else {
      this.collapseMenuItems[i][j] = '';
    }
  }

  clickParentActiveNode(i: number, j: number) {
    this.activeParentNode[this.currentActiveNode.group][
      this.currentActiveNode?.parent
    ] = '';
    this.currentActiveNode = { group: i, parent: j, children: 0 };
    this.activeParentNode[i][j] = 'mm-active';
  }

  showDropDownNavigationMenu(i: number) {
    if (this.dropDownNavigationMenu[i] !== '') {
      this.dropDownNavigationMenu[i] = '';
    } else {
      this.dropDownNavigationMenu[i] = 'show';
    }
  }

  clickActiveChildrenNode(i: number, j: number, k: number) {
    this.activeChildrenNode[this.currentActiveNode.group][
      this.currentActiveNode?.parent
    ][this.currentActiveNode?.children] = '';
    this.currentActiveNode = { group: i, parent: j, children: k };
    this.activeChildrenNode[i][j][k] = 'active';
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

  logout() {
    this.storageService.removeAllLocalStorage();
    this.storageService.deleteToken();
    this.router.navigate(['/login']);
  }

  hideShowSidebar() {
    if (this.sidebar === '') {
      this.sidebar = 'sidemenu-closed sidebar-enable';
    } else {
      this.sidebar = '';
    }

    this.storageService.setLocalStorage('sidebar', this.sidebar);
  }

  hideShowSidebarMobile() {
    this.sidebar = '';
    if (this.sidebarMobile === '') {
      this.sidebarMobile = 'collapse show';
    } else {
      this.sidebarMobile = '';
    }
  }

  showHideProfile() {
    if (this.profile === '') {
      this.profile = 'show';
    } else {
      this.profile = '';
    }
  }

  clickProfileUser() {
    if (this.profileUser === '') {
      this.profileUser = 'show';
    } else {
      this.profileUser = '';
    }
  }

  profileIconSelectEvent(event: MenuEventArgs) {
    console.log(event);
    switch (event.item.id) {
      case 'settings':
        this.router.navigate(['dashboard/settings']);
        break;
      case 'logout':
        this.logout();
        break;
      default:
        break;
    }
  }
}
