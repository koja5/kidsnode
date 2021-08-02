import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KindergardenGroupComponent } from './components/dashboard/children/kindergarden-group/kindergarden-group.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./components/dashboard/routing-module/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
