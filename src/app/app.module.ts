import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//CUSTOM MODULE
import { DynamicModuleModule } from './components/dynamic-component/dynamic-module/dynamic-module.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginModule } from './components/login/routing-module/login.module';
import { FormsModule } from '@angular/forms';
import { KindergardenGroupComponent } from './components/dashboard/children/kindergarden-group/kindergarden-group.component';
import { ChildrenComponent } from './components/dashboard/children/children/children.component';

@NgModule({
  declarations: [
    AppComponent,
    KindergardenGroupComponent,
    ChildrenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    DynamicModuleModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
