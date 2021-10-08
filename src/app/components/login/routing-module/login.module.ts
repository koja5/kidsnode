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
import { LoaderBrandComponent } from '../../common/loader-brand/loader-brand.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoaderBrandComponent
  ],
  imports: [
    DynamicModuleModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [],
})
export class LoginModule {}
