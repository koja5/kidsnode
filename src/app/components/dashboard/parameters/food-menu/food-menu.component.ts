import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss'],
})
export class FoodMenuComponent implements OnInit {
  public path = '/scheduler/parameter';
  public file = 'food-menu.json';
  public modal = false;
  public language: any;
  public data = {};
  public menu: any;
  public dateFrom: any;
  public dateTo: any;
  public note!: string;
  public field = {
    text: 'name',
    value: 'name',
  };
  public config: any;

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private configurationService: ConfigurationService,
    private toastr: ToastrComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initializeConfig();
    this.initializeData();
  }

  initializeConfig() {
    this.configurationService
      .getConfiguration('other', 'food-menu.json')
      .subscribe((data) => {
        this.config = data;
      });
  }

  initializeData() {
    const data = {
      request: {
        type: 'GET',
        api: '/api/getFoodsMenu',
        fields: '',
        root: '',
      },
    };
    this.apiService.callApi(data, this.router).subscribe((data: any) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          this.dateFrom = new Date(data[i].from_date);
          this.dateTo = new Date(data[i].to_date);
          this.data = JSON.parse(data[i].content);
          this.note = data[i].note;
        }
      }
    });
  }

  openModal() {
    const data = {
      request: {
        type: 'GET',
        api: '/api/getFoods',
        fields: '',
        root: '',
      },
    };
    this.apiService.callApi(data, this.router).subscribe((data) => {
      if (data) {
        this.menu = data;
      }
    });
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  saveFoodMenu() {
    let api;
    if (this.dateFrom && this.dateTo) {
      api = '/api/createFoodsMenu';
    } else {
      api = '/api/updateFoodsMenu';
    }
    const body = {
      request: {
        type: 'POST',
        api: api,
        parameters: [],
        fields: '',
        root: '',
      },
      body: {
        from_date: this.dateFrom,
        to_date: this.dateTo,
        content: JSON.stringify(this.data),
        note: this.note,
      },
    };
    this.apiService.callApi(body, this.router).subscribe((data) => {
      if (data) {
        this.toastr.showSuccess();
        this.modal = false;
      } else {
        this.toastr.showError();
      }
    });
  }
}
