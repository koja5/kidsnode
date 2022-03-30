import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ToastrComponent } from '../../dynamic-component/common/toastr/toastr.component';

@Component({
  selector: 'app-subscribe-section',
  templateUrl: './subscribe-section.component.html',
  styleUrls: ['./subscribe-section.component.scss'],
})
export class SubscribeSectionComponent implements OnInit {
  public email!: string;

  constructor(
    private callApi: CallApiService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {}

  sendForDemoAccount() {
    console.log(this.email);
    const body = {
      email: this.email,
    };
    this.callApi
      .callPostMethod('api/sendRequestForDemoAccount', body)
      .subscribe((data) => {
        this.toastr.showSuccess();
      });
  }
}
