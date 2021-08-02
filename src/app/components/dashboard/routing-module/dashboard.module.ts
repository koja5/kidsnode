import { NgModule } from '@angular/core';
import { DynamicModuleModule } from '../../dynamic-component/dynamic-module/dynamic-module.module';
import { DashboardComponent } from '../dashboard.component';
import { DashboardRouting } from './dashboard-routing';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DynamicModuleModule, DashboardRouting],
  providers: [],
})
export class DashboardModule {}
