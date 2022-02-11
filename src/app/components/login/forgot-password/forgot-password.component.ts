import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDataModel } from 'src/app/models/login-data-model';
import { LoginModel } from 'src/app/models/login-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public configField!: LoginModel;
  public language: any;
  public loginData = new LoginDataModel();
  public notCorrect = false;

  constructor(
    private helpService: HelpService,
    private callApiService: CallApiService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

  changePassword() {
    if (this.loginData.password !== this.loginData.repassword) {
      this.notCorrect = true;
    } else {
      this.notCorrect = false;
      this.loginData.username = this.activateRouter.snapshot.params.id;
      this.callApiService
        .callPostMethod('api/changeForgotPassword', this.loginData)
        .subscribe((data) => {
          if (data) {
            this.toastr.showInfoCustom(this.language.successfulyChangedForgotPassword);
            this.router.navigate(['login']);
          }
        });
    }
  }
}
