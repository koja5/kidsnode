import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KindergardenGroupComponent } from '../kindergarden-group/kindergarden-group.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenRouting {}
