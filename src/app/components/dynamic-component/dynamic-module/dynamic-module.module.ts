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
import {
  AgendaService,
  DayService,
  MonthService,
  RecurrenceEditorAllModule,
  ScheduleAllModule,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { DynamicActionButtonComponent } from '../dynamic-action-button/dynamic-action-button.component';
import { DynamicUploadComponent } from '../dynamic-upload/dynamic-upload.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DynamicPdfViewerComponent } from '../dynamic-pdf-viewer/dynamic-pdf-viewer.component';
import { DynamicIconComponent } from '../common/dynamic-icon/dynamic-icon.component';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { DynamicControlPanelModule } from '../dynamic-control-panel/dynamic-control-panel.module';
import { DynamicBreadcrumbComponent } from '../common/dynamic-breadcrumb/dynamic-breadcrumb.component';
import { DynamicInvoiceComponent } from '../dynamic-invoice/dynamic-invoice.component';
import { DynamicLabelListComponent } from '../dynamic-label-list/dynamic-label-list.component';
import { SharingModule } from 'src/app/sharing.module';

@NgModule({
  declarations: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    DynamicActionButtonComponent,
    DialogModalComponent,
    ToastrComponent,
    DynamicSchedulerComponent,
    DynamicUploadComponent,
    DynamicPdfViewerComponent,
    DynamicIconComponent,
    DynamicBreadcrumbComponent,
    DynamicInvoiceComponent,
  ],
  exports: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    DynamicActionButtonComponent,
    DialogModalComponent,
    ToastrComponent,
    DynamicSchedulerComponent,
    DynamicUploadComponent,
    DynamicPdfViewerComponent,
    DynamicIconComponent,
    DynamicBreadcrumbComponent,
    DynamicInvoiceComponent
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
    SplitButtonModule,
    UploaderModule,
    DialogAllModule,
    DynamicControlPanelModule,
    SharingModule
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
    AgendaService,
  ],
  entryComponents: [DynamicFormsComponent],
})
export class DynamicModuleModule {}
