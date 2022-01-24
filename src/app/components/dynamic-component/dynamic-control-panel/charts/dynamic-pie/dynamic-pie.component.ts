import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AccumulationChartComponent,
  AccumulationChart,
  IAccLoadedEventArgs,
  AccumulationTheme,
} from '@syncfusion/ej2-angular-charts';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-dynamic-pie',
  templateUrl: './dynamic-pie.component.html',
  styleUrls: ['./dynamic-pie.component.scss'],
})
export class DynamicPieComponent implements OnInit {
  @ViewChild('pie')
  public pie!: AccumulationChartComponent | AccumulationChart;
  @Input() config!: any;
  public data: any;
  public animation: Object = {
    enable: false,
  };
  public legendSettings: Object = {
    visible: false,
  };
  public dataLabel: Object = {
    visible: true,
    position: 'Inside',
    name: 'text',
    font: {
      fontWeight: '600',
    },
  };
  public load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = <AccumulationTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );
  }
  public center: Object = { x: '50%', y: '50%' };
  public startAngle: number = 0;
  public endAngle: number = 360;
  public explode: boolean = true;
  public enableAnimation: boolean = false;
  public tooltip: Object = {
    enable: true,
    format: '${point.x} : <b>${point.y}%</b>',
  };
  public loader = true;
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
