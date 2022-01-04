import { NgModule } from '@angular/core';
import { DynamicModuleModule } from '../../dynamic-component/dynamic-module/dynamic-module.module';
import { DashboardComponent } from '../dashboard.component';
import { DashboardRouting } from './dashboard-routing';
import { CommonModule } from '@angular/common';
import {
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { PathComponent } from '../common/path/path.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [DashboardComponent, PathComponent],
  imports: [CommonModule, DynamicModuleModule, DashboardRouting, MatIconModule, DropDownButtonModule ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class DashboardModule {}
