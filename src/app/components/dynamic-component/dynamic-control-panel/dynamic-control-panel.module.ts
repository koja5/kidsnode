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
import { DynamicLabelListComponent } from '../dynamic-label-list/dynamic-label-list.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { MatIconModule } from '@angular/material/icon';
import { DynamicLineComponent } from './charts/dynamic-line/dynamic-line.component';

@NgModule({
  declarations: [
    DynamicControlPanelComponent,
    DynamicPieComponent,
    WidgetsComponent,
    DynamicColumnComponent,
    LoaderContentComponent,
    DynamicLabelListComponent,
    DynamicLineComponent,
  ],
  exports: [
    DynamicControlPanelComponent,
    DynamicPieComponent,
    WidgetsComponent,
    DynamicLabelListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartAllModule,
    AccumulationChartModule,
    MatIconModule,
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
