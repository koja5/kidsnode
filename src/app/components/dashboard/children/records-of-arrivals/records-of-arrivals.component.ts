import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
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
  public selectedChildrenData: any = [];
  public reason!: string;
  public absenseEvidented: string[] = [];

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private router: Router,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initializeData();
  }

  initializeData() {
    this.apiService.callGetMethod('/api/getChildrensAndAbsense', '').subscribe((data) => {
      this.data = data;
    });
  }

  showProfile(id: number) {
    this.router.navigate(['/dashboard/children/profile-children/' + id]);
  }

  selectChildren(item: any, index: number) {
    if (!this.selectedChildren[index] || this.selectedChildren[index] === '') {
      this.selectedChildren[index] = 'selected';
      this.selectedChildrenData.push(item);
    } else {
      this.selectedChildren[index] = '';
      this.removeFromArray(item);
    }
  }

  removeFromArray(item: any) {
    const index: number = this.selectedChildrenData.indexOf(item);
    if (index !== -1) {
      this.selectedChildrenData.splice(index, 1);
    }
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

  recordAbsense() {
    this.apiService
      .callPostMethod('/api/recordAbsense', this.selectedChildrenData)
      .subscribe((data) => {
        if (data) {
          this.toastr.showSuccess();
          this.selectedChildrenData = [];
          this.selectedChildren = {};
        } else {
          this.toastr.showError();
        }
      });
  }

  recordAbsenseSingle(children_id: number) {
    const data = {
      children_id: children_id,
      reason: this.reason,
    };
    this.apiService
      .callPostMethod('/api/recordAbsenseSingle', data)
      .subscribe((data) => {
        if (data) {
          this.absenseEvidented[children_id] = 'evidented';
          this.toastr.showSuccess();
        } else {
          this.toastr.showError();
        }
      });
  }
}
