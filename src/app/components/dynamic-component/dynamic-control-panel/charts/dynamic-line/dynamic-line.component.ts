import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@syncfusion/ej2-base';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-dynamic-line',
  templateUrl: './dynamic-line.component.html',
  styleUrls: ['./dynamic-line.component.scss'],
})
export class DynamicLineComponent implements OnInit {
  @Input() config!: any;
  @Input() id!: number;
  public data: any;
  public loader = true;
  public width: string = Browser.isDevice ? '100%' : '60%';

  constructor(
    private apiService: CallApiService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
