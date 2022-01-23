import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkPlacesComponent } from '../../parameters/work-places/work-places.component';
import { ControlPanelChildrensComponent } from '../control-panel-items/control-panel-childrens/control-panel-childrens.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'childrens',
    pathMatch: 'full',
  },
  {
    path: 'childrens',
    component: ControlPanelChildrensComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPanelRouting {}
