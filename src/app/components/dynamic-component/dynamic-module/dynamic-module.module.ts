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

@NgModule({
  declarations: [DynamicGridComponent, DynamicFormsComponent],
  exports: [DynamicGridComponent, DynamicFormsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DynamicFormsModule,
    FormsModule,
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
