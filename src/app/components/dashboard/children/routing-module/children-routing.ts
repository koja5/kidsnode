import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChildrenComponent } from '../all-children/all-children.component';
import { ProfileChildrenComponent } from '../all-children/profile-children/profile-children.component';
import { KindergardenGroupComponent } from '../kindergarden-group/kindergarden-group.component';
import { KindergardenSubgroupComponent } from '../kindergarden-subgroup/kindergarden-subgroup.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenRouting {}
