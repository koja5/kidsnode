import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AccumulationChartModule,
  ChartAllModule,
} from '@syncfusion/ej2-angular-charts';
import {
  PieSeriesService,
  AccumulationLegendService,
  AccumulationTooltipService,
  AccumulationAnnotationService,
  AccumulationDataLabelService,
  CategoryService,
  DateTimeService,
  ScrollBarService,
  ColumnSeriesService,
  LineSeriesService,
  ChartAnnotationService,
  RangeColumnSeriesService,
  StackingColumnSeriesService,
  LegendService,
  TooltipService,
} from '@syncfusion/ej2-angular-charts';
import { DynamicPieComponent } from './charts/dynamic-pie/dynamic-pie.component';
import { DynamicControlPanelComponent } from './dynamic-control-panel.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { DynamicColumnComponent } from './charts/dynamic-column/dynamic-column.component';
import { LoaderSvgComponent } from '../../common/loader-svg/loader-svg.component';
import { LoaderContentComponent } from '../common/loader-content/loader-content.component';

@NgModule({
  declarations: [
    DynamicControlPanelComponent,
    DynamicPieComponent,
    WidgetsComponent,
    DynamicColumnComponent,
    LoaderContentComponent
  ],
  exports: [
    DynamicControlPanelComponent,
    DynamicPieComponent,
    WidgetsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartAllModule,
    AccumulationChartModule,
  ],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationAnnotationService,
    AccumulationDataLabelService,
    CategoryService,
    DateTimeService,
    ScrollBarService,
    LineSeriesService,
    ColumnSeriesService,
    ChartAnnotationService,
    RangeColumnSeriesService,
    StackingColumnSeriesService,
    LegendService,
    TooltipService,
  ],
  entryComponents: [],
})
export class DynamicControlPanelModule {}
