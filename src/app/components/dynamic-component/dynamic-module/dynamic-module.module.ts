import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//CUSTOM MODULE
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {NumericTextBoxModule, TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { ComboBoxModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

//CUSTOM COMPONENT
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { TextBoxComponent } from '../form-input/inputs/text-box/text-box.component';
import { NumericTextboxComponent } from '../form-input/inputs/numeric-textbox/numeric-textbox.component';
import { ComboboxComponent } from '../form-input/dropdowns/combobox/combobox.component';
import { MultiselectComponent } from '../form-input/dropdowns/multiselect/multiselect.component';
import { CheckboxComponent } from '../form-input/buttons/checkbox/checkbox.component';
import { RadioComponent } from '../form-input/buttons/radio/radio.component';
import { ButtonComponent } from '../form-input/buttons/button/button.component';


@NgModule({
  declarations: [DynamicGridComponent, TextBoxComponent, NumericTextboxComponent, ComboboxComponent, MultiselectComponent, CheckboxComponent, RadioComponent, ButtonComponent],
  exports: [GridModule, DynamicGridComponent, TextBoxComponent, NumericTextboxComponent, ComboboxComponent, MultiselectComponent, CheckboxComponent, RadioComponent, ButtonComponent],
  imports: [CommonModule, GridModule, TextBoxModule, NumericTextBoxModule, ComboBoxModule, MultiSelectModule, CheckBoxModule, RadioButtonModule, ButtonModule ]
})
export class DynamicModuleModule {}
