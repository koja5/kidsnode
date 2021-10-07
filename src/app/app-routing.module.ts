import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { KindergardenGroupComponent } from './components/dashboard/children/kindergarden-group/kindergarden-group.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { LoggedGuardService } from './services/login-guard/logged-guard.service';
import { LoginGuardService } from './services/login-guard/login-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [LoginGuardService],
    component: DashboardComponent,
    loadChildren: () =>
      import('./components/dashboard/routing-module/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'login',
    canActivate: [LoggedGuardService],
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
