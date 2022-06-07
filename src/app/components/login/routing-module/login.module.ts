import { NgModule } from '@angular/core';

// SERVICES
import { CookieService } from 'ngx-cookie-service';

//CUSTOM MODULE

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DynamicModuleModule } from '../../dynamic-component/dynamic-module/dynamic-module.module';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent],
  imports: [
    DynamicModuleModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [CookieService],
  bootstrap: [],
})
export class LoginModule {}
