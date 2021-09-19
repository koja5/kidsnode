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

//CUSTOM COMPONENT
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DynamicTabsComponent } from '../dynamic-tabs/dynamic-tabs.component';
import { LoaderComponent } from '../../common/loader/loader.component';
import { DialogModalComponent } from '../../common/dialog-modal/dialog-modal.component';

@NgModule({
  declarations: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    LoaderComponent,
    DialogModalComponent
  ],
  exports: [
    DynamicGridComponent,
    DynamicFormsComponent,
    DynamicTabsComponent,
    LoaderComponent,
    DialogModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DynamicFormsModule,
    FormsModule,
    TabModule,
    ToastrModule.forRoot(),
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
  ],
  entryComponents: [DynamicFormsComponent],
})
export class DynamicModuleModule {}
