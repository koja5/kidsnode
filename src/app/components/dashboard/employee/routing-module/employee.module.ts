import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { AvatarComponent } from '../../common/avatar/avatar.component';
import { CommonDashboardModule } from '../../common/common-dashboard.module';
import { AllEmployeeComponent } from '../all-employee/all-employee.component';
import { EmployeeComponent } from '../employee/employee.component';
import { ProfileEmployeeComponent } from '../employee/profile-employee/profile-employee.component';
import { ReportingPresenceComponent } from '../reporting-presence/reporting-presence.component';
import { WorkDiaryComponent } from '../work-diary/work-diary.component';
import { EmployeeRouting } from './employee-routing';

@NgModule({
  declarations: [
    AllEmployeeComponent,
    EmployeeComponent,
    ProfileEmployeeComponent,
    WorkDiaryComponent,
    ReportingPresenceComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRouting,
    DynamicModuleModule,
    CommonDashboardModule,
  ],
  providers: [],
})
export class EmployeeModule {}
