import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrComponent } from 'src/app/components/dynamic-component/common/toastr/toastr.component';
import { CallApiService } from 'src/app/services/call-api.service';
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
  public field = {
    text: 'name',
    value: 'name',
  };
  public config = [
    {
      id: '',
      class: 'col-sm-2 header',
      label: 'Dan u nedelji',
    },
    {
      id: '',
      class: 'col-sm-3 header',
      label: 'Dorucak',
    },
    {
      id: '',
      class: 'col-sm-2 header',
      label: 'Užina',
    },
    {
      id: '',
      class: 'col-sm-3 header',
      label: 'Ručak',
    },
    {
      id: '',
      class: 'col-sm-2 header',
      label: 'Užina',
    },
    {
      id: '',
      class: 'col-sm-2',
      label: 'Ponedeljak',
    },
    {
      id: 'breakfastMonday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackOneMonday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'lunchMonday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackTwoMonday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: '',
      class: 'col-sm-2',
      label: 'Utorak',
    },
    {
      id: 'breakfastTuesday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackOneTuesday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'lunchTuesday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackTwoTuesday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: '',
      class: 'col-sm-2',
      label: 'Sreda',
    },
    {
      id: 'breakfastWednesday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackOneWednesday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'lunchWednesday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackTwoWednesday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: '',
      class: 'col-sm-2',
      label: 'Četvrtak',
    },
    {
      id: 'breakfastThursday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackOneThursday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'lunchThursday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackTwoThursday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: '',
      class: 'col-sm-2',
      label: 'Petak',
    },
    {
      id: 'breakfastFriday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackOneFriday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'lunchFriday',
      class: 'col-sm-3 cell pt-2 pb-2',
      label: '',
    },
    {
      id: 'snackTwoFriday',
      class: 'col-sm-2 cell pt-2 pb-2',
      label: '',
    },
  ];

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private toastr: ToastrComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.initializeData();
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
