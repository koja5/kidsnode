import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  @Input() config: any;
  public language: any;
  public loader: any = {};
  public data: any = {};

  constructor(
    private helpService: HelpService,
    private apiService: CallApiService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.getData();
  }

  getData() {
    for (let i = 0; i < this.config.widgets.length; i++) {
      this.loader[this.config.widgets[i].name] = true;
      if (this.config.widgets[i].request) {
        this.apiService
          .callApi(this.config.widgets[i], this.router)
          .subscribe((data: any) => {
            if (this.config.widgets[i].root) {
              this.data[this.config.widgets[i].name] =
                data[this.config.widgets[i].root][
                  this.config.widgets[i].valueField
                ];
            } else {
              this.data[this.config.widgets[i].name] =
                data[this.config.widgets[i].valueField];
            }

            this.loader[this.config.widgets[i].name] = false;
          });
      }
    }
  }
}
