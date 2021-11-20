import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//CUSTOM MODULE
import {
  ContextMenuService,
  EditService,
  ExcelExportService,
  FilterService,
  GridModule,
  GroupService,
  PageService,
  PdfExportService,
  ResizeService,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

//CUSTOM COMPONENT
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DynamicTabsComponent } from '../dynamic-tabs/dynamic-tabs.component';
import { LoaderComponent } from '../../common/loader/loader.component';
import { DialogModalComponent } from '../../common/dialog-modal/dialog-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { DynamicSchedulerComponent } from '../dynamic-scheduler/dynamic-scheduler.component';
import { AgendaService, DayService, MonthService, RecurrenceEditorAllModule, ScheduleAllModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { DynamicActionButtonComponent } from '../dynamic-action-button/dynamic-action-button.component';

@NgModule({
  declarations: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    DynamicActionButtonComponent,
    LoaderComponent,
    DialogModalComponent,
    ToastrComponent,
    DynamicSchedulerComponent
  ],
  exports: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    DynamicActionButtonComponent,
    LoaderComponent,
    DialogModalComponent,
    ToastrComponent,
    DynamicSchedulerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DynamicFormsModule,
    FormsModule,
    TabModule,
    ToastrModule.forRoot(),
    MatIconModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    DropDownButtonModule,
    SplitButtonModule
  ],
  providers: [
    EditService,
    PdfExportService,
    ExcelExportService,
    ToolbarService,
    SortService,
    FilterService,
    ContextMenuService,
    PageService,
    GroupService,
    ResizeService,
    ToastrComponent,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService
  ],
  entryComponents: [DynamicFormsComponent],
})
export class DynamicModuleModule {}
