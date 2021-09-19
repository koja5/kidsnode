import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from '../children/children/children.component';
import { DashboardComponent } from '../dashboard.component';
import { EmployeeComponent } from '../employee/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'children',
    pathMatch: 'full',
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
