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
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-dynamic-pie',
  templateUrl: './dynamic-pie.component.html',
  styleUrls: ['./dynamic-pie.component.scss'],
})
export class DynamicPieComponent implements OnInit {
  @ViewChild('pie')
  public pie!: AccumulationChartComponent | AccumulationChart;
  @Input() config!: any;
  @Input() id?: number;
  public data: any;
  public loader = true;
  public language: any;

  constructor(
    private apiService: CallApiService,
    private router: ActivatedRoute,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.language = this.helpService.getLanguage();
    this.getData();
  }

  getData() {
    this.apiService.callApi(this.config, this.router).subscribe((data) => {
      this.data = data;
      this.loader = false;
    });
  }

  refresh() {
    this.ngOnInit();
  }

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
}
