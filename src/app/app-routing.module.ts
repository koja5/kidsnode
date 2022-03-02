import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home/home.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { LoggedGuardService } from './services/login-guard/logged-guard.service';
import { LoginGuardService } from './services/login-guard/login-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/routing-module/home.module').then(
        (m) => m.HomedModule
      ),
  },
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
    path: 'login/change-password/:id',
    canActivate: [LoggedGuardService],
    component: ForgotPasswordComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
