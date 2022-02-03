import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { SettingGeneralComponent } from '../setting-items/setting-general/setting-general.component';

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
    path: 'general',
    component: SettingGeneralComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRouting {}
