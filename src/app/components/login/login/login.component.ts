import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataModel } from 'src/app/models/login-data-model';
import { LoginModel } from 'src/app/models/login-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public configField: LoginModel;
  public language: any;
  public loader: boolean = false;
  public loginForgotPasswordIndicator = 'login';
  public loginData = new LoginDataModel();
  public notCorrect = false;

  constructor(
    private callApiService: CallApiService,
    private router: Router,
    private storageService: StorageService,
    private configurationService: ConfigurationService,
    private helpService: HelpService
  ) {
    this.configField = {
      form: {
        config: [
          {
            type: 'textbox',
            width: 'col-md-12',
            class: 'e-outline',
            name: 'username',
            placeholder: 'Ime vrtica',
            field: 'username',
          },
          {
            type: 'textbox',
            width: 'col-md-12',
            class: 'e-outline',
            name: 'password',
            placeholder: 'Lozinka',
            field: 'password',
          },
          {
            type: 'button',
            width: 'col-md-12',
            class: 'e-info login-button',
            name: 'submit',
            title: 'loginButton',
            field: 'submit',
            positionClass: 'mt-3 col-md-12',
          },
        ],
      },
    };
  }

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.initializationLanguage();
  }

  initializationLanguage() {
    if (this.helpService.getLanguage()) {
      this.language = this.helpService.getLanguage();
    } else {
      this.configurationService.getLanguage('serbian').subscribe((language) => {
        this.language = language;
        this.helpService.setLanguage(language);
      });
    }
  }

  login(event: any) {
    this.loader = true;
    this.callApiService.callPostMethod('api/login', this.loginData).subscribe(
      (data) => {
        if (data) {
          this.setUserInfoAndRoute(data);
          this.notCorrect = false;
        } else {
          this.loader = false;
          this.notCorrect = true;
        }
      },
      (error) => {
        this.loader = false;
        this.notCorrect = true;
      }
    );
  }
  setUserInfoAndRoute(data: any) {
    // this.storageService.setLocalStorage('token', data.token);
    this.storageService.setToken(data.token);
    setTimeout(() => {
      this.loader = false;
      this.router.navigate(['/dashboard']);
    }, 100);
  }
}
