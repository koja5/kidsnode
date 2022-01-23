import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ChartModule,
  AccumulationChartModule,
} from '@syncfusion/ej2-angular-charts';
import {
  PieSeriesService,
  AccumulationLegendService,
  AccumulationTooltipService,
  AccumulationAnnotationService,
  AccumulationDataLabelService,
} from '@syncfusion/ej2-angular-charts';
import { DynamicPieComponent } from './charts/dynamic-pie/dynamic-pie.component';
import { DynamicControlPanelComponent } from './dynamic-control-panel.component';

@NgModule({
  declarations: [DynamicControlPanelComponent, DynamicPieComponent],
  exports: [DynamicControlPanelComponent, DynamicPieComponent],
  imports: [CommonModule, ChartModule, AccumulationChartModule],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationAnnotationService,
    AccumulationDataLabelService,
  ],
  entryComponents: [],
})
export class DynamicControlPanelModule {}
