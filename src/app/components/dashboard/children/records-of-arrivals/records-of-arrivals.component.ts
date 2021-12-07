import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-records-of-arrivals',
  templateUrl: './records-of-arrivals.component.html',
  styleUrls: ['./records-of-arrivals.component.scss'],
})
export class RecordsOfArrivalsComponent implements OnInit {
  public language: any;
  public data: any;
  public selectedChildren: any = {};

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
    this.apiService.callGetMethod('/api/getChildrens', '').subscribe((data) => {
      this.data = data;
    });
  }

  showProfile(id: number) {
    this.router.navigate(['/dashboard/children/profile-children/' + id]);
  }

  selectChildren(index: number) {
    if (!this.selectedChildren[index] || this.selectedChildren[index] === '') {
      this.selectedChildren[index] = 'selected';
    } else {
      this.selectedChildren[index] = '';
    }
  }
}
