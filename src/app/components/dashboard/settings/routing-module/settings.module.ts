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
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [SettingsComponent, 
    ControlPanelComponent],
  imports: [CommonModule, DynamicModuleModule, SettingsRouting, MatIconModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SettingsModule {}
