import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from '../settings.component';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { SettingsRouting } from './settings-routing';
import { ControlPanelComponent } from '../control-panel/control-panel.component';

import { SettingChangePasswordComponent } from '../setting-items/setting-change-password/setting-change-password.component';
import { SettingKindergardenProfileComponent } from '../setting-items/setting-kindergarden-profile/setting-kindergarden-profile.component';
import { SettingOwnerProfileComponent } from '../setting-items/setting-owner-profile/setting-owner-profile.component';
import { SettingEmployeeProfileComponent } from '../setting-items/setting-employee-profile/setting-employee-profile.component';
import { SettingPersonalizeComponent } from '../setting-items/setting-personalize/setting-personalize.component';
import { CommonCustomModule } from 'src/app/components/common/common-custom.module';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from 'src/app/components/common/back-button/back-button.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    SettingsComponent,
    ControlPanelComponent,
    SettingKindergardenProfileComponent,
    SettingChangePasswordComponent,
    SettingOwnerProfileComponent,
    SettingEmployeeProfileComponent,
    SettingPersonalizeComponent,
    BackButtonComponent,
  ],
  imports: [CommonModule, DynamicModuleModule, SettingsRouting, MatIconModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SettingsModule {}
