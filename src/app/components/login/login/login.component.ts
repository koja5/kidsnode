import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public configField: LoginModel;

  constructor(
    private callApiService: CallApiService,
    private router: Router,
    private storageService: StorageService
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
            label: 'changePasswordButton',
            field: 'submit',
            positionClass: 'mt-3 col-md-12',
          },
        ],
      },
    };
  }

  ngOnInit(): void {}

  login(event: any) {
    this.callApiService.callPostMethod('api/login', event).subscribe((data) => {
      if (data) {
        this.setUserInfo(data);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  setUserInfo(data: any) {
    this.storageService.setLocalStorage('username', data.user[0].firstname);
    this.storageService.setLocalStorage('token', data.token);
  }
}
