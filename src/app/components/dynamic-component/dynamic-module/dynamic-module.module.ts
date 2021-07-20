import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//CUSTOM MODULE
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {NumericTextBoxModule, TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { ComboBoxModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

//CUSTOM COMPONENT
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicGridComponent, DynamicFormsComponent],
  exports: [DynamicGridComponent, DynamicFormsComponent],
  imports: [CommonModule, ReactiveFormsModule, GridModule, DynamicFormsModule],
  entryComponents: [DynamicFormsComponent]
})
export class DynamicModuleModule {}
