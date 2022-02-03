import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ILoadedEventArgs,
  ChartComponent,
  ChartTheme,
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-dynamic-column',
  templateUrl: './dynamic-column.component.html',
  styleUrls: ['./dynamic-column.component.scss'],
})
export class DynamicColumnComponent implements OnInit {
  @Input() config!: any;
  public data: any;
  public loader = true;
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' },
  };
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: { fontWeight: '600', color: '#ffffff' },
    },
  };
  public tooltip: Object = {
    enable: true,
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );
    if (selectedTheme === 'highcontrast') {
    }
  }
  // custom code end
  public chartArea: Object = {
    border: {
      width: 0,
    },
  };
  public width: string = Browser.isDevice ? '100%' : '60%';

  constructor(
    private apiService: CallApiService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.getData();
  }

  getData() {
    this.apiService.callApi(this.config, this.router).subscribe((data) => {
      this.data = data;
      this.loader = false;
    });
  }
}
