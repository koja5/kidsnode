import { Component, Input, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../common/toastr/toastr.component';

@Component({
  selector: 'app-dynamic-control-panel',
  templateUrl: './dynamic-control-panel.component.html',
  styleUrls: ['./dynamic-control-panel.component.scss'],
})
export class DynamicControlPanelComponent implements OnInit {
  @Input() path!: string;
  @Input() file!: string;
  public language: any;
  public config: any;
  public loader = true;
  public user = {
    name: '',
    type: '',
    typeName: '',
  };
  public signInIndicator!: number;
  public signWorkDate: any = {};

  constructor(
    private helpService: HelpService,
    private configurationService: ConfigurationService,
    private apiService: CallApiService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.getUserInfo();
    this.getReportingPresenceEmployee();
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.loader = false;
      });
  }

  getUserInfo() {
    const token = this.helpService.getDecodeToken();
    this.user.name =
      (token.firstname ? token.firstname : '') +
      ' ' +
      (token.lastname ? token.lastname : '');
    this.user.type = token.type;
    this.user.typeName = this.language[
      this.helpService.getTypeOfName(token.type)
    ]
      ? this.language[this.helpService.getTypeOfName(token.type)]
      : this.helpService.getTypeOfName(token.type);
  }

  getReportingPresenceEmployee() {
    this.apiService
      .callGetMethod('/api/control-panel/getReportingPresenceEmployee', '')
      .subscribe((data: any) => {
        console.log(data);
        if (data && data?.start_date && !data?.end_date) {
          this.signWorkDate.start_date = data?.start_date;
          this.signInIndicator = 0;
        } else if (data && data?.end_date) {
          this.signWorkDate = {
            start_date: data?.start_date,
            end_date: data?.end_date,
          };
          this.signInIndicator = -1;
        } else {
          this.signInIndicator = 1;
        }
      });
  }

  getTodayDate() {
    const date = new Date();
    return (
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      '.'
    );
  }

  signInWork() {
    this.apiService
      .callPostMethod('/api/control-panel/signInWork', {})
      .subscribe((data) => {
        if (data) {
          this.toastr.showSuccessCustom(
            this.language.successfulySignInWork,
            ''
          );
          this.signInIndicator = 0;
          this.signWorkDate['start_date'] = data;
        }
      });
  }

  signOutWork() {
    this.apiService
      .callPostMethod('/api/control-panel/signOutWork', {})
      .subscribe((data) => {
        if (data) {
          this.toastr.showSuccessCustom(
            this.language.successfulySignInWork,
            ''
          );
          this.signInIndicator = -1;
          this.signWorkDate['end_date'] = data;
        }
      });
  }
}
