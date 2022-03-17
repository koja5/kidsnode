import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-reporting-presence',
  templateUrl: './reporting-presence.component.html',
  styleUrls: ['./reporting-presence.component.scss'],
})
export class ReportingPresenceComponent implements OnInit {
  public language: any;
  public data: any;
  reportingPresence: any[] = [];

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initializeData();
  }

  initializeData() {
    this.apiService.callGetMethod('/api/getEmployees', '').subscribe((data) => {
      this.data = data;
      this.getReportingPresence();
    });
  }

  getReportingPresence() {
    this.apiService
      .callGetMethod(
        '/api/control-panel/getReportingPresenceEmployeeByKindergarden',
        ''
      )
      .subscribe((data) => {
        this.setReportingPresence(data);
      });
  }

  setReportingPresence(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.reportingPresence[data[i].employee_id] = {
        start_date: data[i].start_date,
        end_date: data[i].end_date,
        is_holiday: data[i].is_holiday,
      };
    }
  }

  getTodayDate() {
    return this.helpService.getTodayDate();
  }
}
