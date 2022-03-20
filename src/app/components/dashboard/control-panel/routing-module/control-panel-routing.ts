import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkPlacesComponent } from '../../parameters/work-places/work-places.component';
import { ControlPanelOwnerComponent } from '../control-panel-items/control-panel-childrens/control-panel-owner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'owner',
    pathMatch: 'full',
  },
  {
    path: 'owner',
    component: ControlPanelOwnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPanelRouting {}
