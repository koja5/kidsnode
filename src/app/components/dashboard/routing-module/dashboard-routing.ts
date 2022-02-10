import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTypeGuardService } from 'src/app/services/login-guard/user-type-guard.service';
import { ChildrenComponent } from '../children/children/children.component';
import { ControlPanelComponent } from '../control-panel/control-panel/control-panel.component';
import { EmployeeComponent } from '../employee/employee/employee.component';
import { InvoiceComponent } from '../invoice/invoice/invoice.component';
import { ParametersComponent } from '../parameters/parameters/parameters.component';
import { ServicesComponent } from '../services/services.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'control-panel',
    pathMatch: 'full',
  },
  {
    path: 'children',
    component: ChildrenComponent,
    canActivate: [UserTypeGuardService],
    data: {
      roles: [
        'director',
        'owner',
        'educator',
        'speech_therapist',
        'pedagogue',
        'psychologist',
        'pediatrician',
      ],
    },
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
  {
    path: 'services',
    component: ServicesComponent,
    loadChildren: () =>
      import('../services/routing-module/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    loadChildren: () =>
      import('../control-panel/routing-module/control-panel.module').then(
        (m) => m.ControlPanelModule
      ),
  },
  {
    path: 'invoices',
    component: InvoiceComponent,
    loadChildren: () =>
      import('../invoice/routing-module/invoice.module').then(
        (m) => m.InvoiceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
