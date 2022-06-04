import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  public form = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
  };
  public status = -1;
  public language: any;

  constructor(
    private callApi: CallApiService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguageForLanding();
  }

  submitForm() {
    this.status = -1;
    if (
      !this.form.firstname ||
      !this.form.phone ||
      !this.form.email ||
      !this.form.message
    ) {
      this.status = 0;
    } else {
      this.callApi
        .callPostMethod('/api/sendFromContactForm', this.form)
        .subscribe((data) => {
          this.status = 1;
        });
    }
  }
}
