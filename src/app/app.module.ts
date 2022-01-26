import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//CUSTOM MODULE
import { DynamicModuleModule } from './components/dynamic-component/dynamic-module/dynamic-module.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginModule } from './components/login/routing-module/login.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { DynamicBreadcrumbComponent } from './components/dynamic-component/common/dynamic-breadcrumb/dynamic-breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
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
