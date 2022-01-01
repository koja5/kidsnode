import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChildrenComponent } from '../all-children/all-children.component';
import { ProfileChildrenComponent } from '../all-children/profile-children/profile-children.component';
import { CalendarOfActivityComponent } from '../calendar-of-activity/calendar-of-activity.component';
import { KindergardenGroupComponent } from '../kindergarden-group/kindergarden-group.component';
import { KindergardenSubgroupComponent } from '../kindergarden-subgroup/kindergarden-subgroup.component';
import { RecordsOfArrivalsComponent } from '../records-of-arrivals/records-of-arrivals.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'group',
    pathMatch: 'full',
  },
  {
    path: 'group',
    component: KindergardenGroupComponent,
  },
  {
    path: 'subgroup',
    component: KindergardenSubgroupComponent,
  },
  {
    path: 'all-childrens',
    component: AllChildrenComponent
  },
  {
    path: 'profile-children/:id',
    component: ProfileChildrenComponent
  },
  {
    path: 'records-of-arrivals',
    component: RecordsOfArrivalsComponent
  },
  {
    path: 'calendar-of-children-activity',
    component: CalendarOfActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenRouting {}
