import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from '../children/children/children.component';
import { EmployeeComponent } from '../employee/employee/employee.component';
import { ParametersComponent } from '../parameters/parameters/parameters.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'children',
    pathMatch: 'full',
  },
  {
    path: 'children',
    component: ChildrenComponent,
    loadChildren: () =>
      import('../children/routing-module/children.module').then(
        (m) => m.ChildrenModule
      ),
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    loadChildren: () =>
      import('../employee/routing-module/employee.module').then(
        (m) => m.EmployeeModule
      ),
  },
  {
    path: 'parameters',
    component: ParametersComponent,
    loadChildren: () =>
      import('../parameters/routing-module/parameters.module').then(
        (m) => m.ParametersModule
      ),
  },
  {
    path: 'settings',
    component: SettingsComponent,
    loadChildren: () =>
      import('../settings/routing-module/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
