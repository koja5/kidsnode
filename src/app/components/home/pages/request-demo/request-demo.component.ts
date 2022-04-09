import { Component, OnInit } from '@angular/core';
import { ReqeustDemoAccount } from 'src/app/models/request-demo-account';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.scss'],
})
export class RequestDemoComponent implements OnInit {
  public data = new ReqeustDemoAccount();
  public required = false;
  public success = false;

  constructor(private callApi: CallApiService) {}

  ngOnInit(): void {}

  sendReqestForDemoAccount() {
    this.required = false;
    this.success = false;
    if (
      !this.data.name ||
      !this.data.email ||
      !this.data.phone ||
      !this.data.nameOfKindergarden ||
      !this.data.countOfChildrens
    ) {
      this.required = true;
    } else {
      this.callApi
        .callPostMethod('/api/sendReqestForDemoAccountFull', this.data)
        .subscribe((data) => {
          if (data) {
            this.success = true;
            this.data = new ReqeustDemoAccount();
          }
        });
    }
  }
}
