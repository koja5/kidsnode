import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//CUSTOM MODULE
import {
  EditService,
  FilterService,
  GridModule,
  GroupService,
  PageService,
  PdfExportService,
  ResizeService,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
//CUSTOM COMPONENT
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicGridComponent, DynamicFormsComponent],
  exports: [DynamicGridComponent, DynamicFormsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DynamicFormsModule,
    FormsModule
  ],
  providers: [
    EditService,
    PdfExportService,
    ToolbarService,
    SortService,
    FilterService,
    PageService,
    GroupService,
    ResizeService,
  ],
  entryComponents: [DynamicFormsComponent],
})
export class DynamicModuleModule {}
