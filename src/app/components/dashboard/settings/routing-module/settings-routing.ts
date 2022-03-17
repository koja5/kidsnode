import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { SettingChangePasswordComponent } from '../setting-items/setting-change-password/setting-change-password.component';
import { SettingOwnerProfileComponent } from '../setting-items/setting-owner-profile/setting-owner-profile.component';
import { SettingKindergardenProfileComponent } from '../setting-items/setting-kindergarden-profile/setting-kindergarden-profile.component';
import { SettingEmployeeProfileComponent } from '../setting-items/setting-employee-profile/setting-employee-profile.component';
import { SettingPersonalizeComponent } from '../setting-items/setting-personalize/setting-personalize.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'control-panel',
    pathMatch: 'full',
  },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
  },
  {
    path: 'kindergarden-profile',
    component: SettingKindergardenProfileComponent,
  },
  {
    path: 'owner-profile',
    component: SettingOwnerProfileComponent,
  },
  {
    path: 'employee-profile',
    component: SettingEmployeeProfileComponent,
  },
  {
    path: 'change-password',
    component: SettingChangePasswordComponent,
  },
  {
    path: 'personalize',
    component: SettingPersonalizeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRouting {}
