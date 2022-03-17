import { NgModule } from '@angular/core';
import { ChildrenRouting } from './children-routing';
import { KindergardenGroupComponent } from '../kindergarden-group/kindergarden-group.component';
import { ChildrenComponent } from '../children/children.component';
import { KindergardenSubgroupComponent } from '../kindergarden-subgroup/kindergarden-subgroup.component';
import { AllChildrenComponent } from '../all-children/all-children.component';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { ProfileChildrenComponent } from '../all-children/profile-children/profile-children.component';
import { RecordsOfArrivalsComponent } from '../records-of-arrivals/records-of-arrivals.component';
import { AvatarComponent } from 'src/app/components/dashboard/common/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { CalendarOfActivityComponent } from '../calendar-of-activity/calendar-of-activity.component';
import { FormsModule } from '@angular/forms';
import { CommonDashboardModule } from '../../common/common-dashboard.module';

@NgModule({
  declarations: [
    KindergardenGroupComponent,
    ChildrenComponent,
    KindergardenSubgroupComponent,
    AllChildrenComponent,
    ProfileChildrenComponent,
    RecordsOfArrivalsComponent,
    CalendarOfActivityComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChildrenRouting,
    DynamicModuleModule,
    CommonDashboardModule,
  ],
  providers: [],
})
export class ChildrenModule {}
