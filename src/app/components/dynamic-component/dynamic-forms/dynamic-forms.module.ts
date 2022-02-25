import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NumericTextBoxModule,
  TextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
import {
  ButtonModule,
  CheckBoxModule,
  RadioButtonModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';

//CUSTOM COMPONENT
import { TextBoxComponent } from './dynamic-fields/inputs/text-box/text-box.component';
import { NumericTextboxComponent } from './dynamic-fields/inputs/numeric-textbox/numeric-textbox.component';
import { ComboboxComponent } from './dynamic-fields/dropdowns/combobox/combobox.component';
import { MultiselectComponent } from './dynamic-fields/dropdowns/multiselect/multiselect.component';
import { CheckboxComponent } from './dynamic-fields/buttons/checkbox/checkbox.component';
import { RadioComponent } from './dynamic-fields/buttons/radio/radio.component';
import { ButtonComponent } from './dynamic-fields/buttons/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DynamicFieldsDirective } from './dynamic-fields/dynamic-fields.directive';
import { DatepickerComponent } from './dynamic-fields/inputs/datepicker/datepicker.component';
import { DatePickerModule, DateTimePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { LabelComponent } from './dynamic-fields/text/label/label.component';
import { LoaderSvgComponent } from '../../common/loader-svg/loader-svg.component';
import { DatetimepickerComponent } from './dynamic-fields/inputs/datetimepicker/datetimepicker.component';
import { SwitchComponent } from './dynamic-fields/buttons/switch/switch.component';

@NgModule({
  declarations: [
    DynamicFieldsDirective,
    TextBoxComponent,
    NumericTextboxComponent,
    ComboboxComponent,
    MultiselectComponent,
    CheckboxComponent,
    RadioComponent,
    ButtonComponent,
    DatepickerComponent,
    LabelComponent,
    DatetimepickerComponent,
    SwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    NumericTextBoxModule,
    ComboBoxModule,
    CheckBoxModule,
    RadioButtonModule,
    ButtonModule,
    MultiSelectModule,
    DatePickerModule,
    DateTimePickerModule,
    SwitchModule
  ],
  exports: [DynamicFieldsDirective],
  entryComponents: [
    TextBoxComponent,
    NumericTextboxComponent,
    ComboboxComponent,
    MultiselectComponent,
    CheckboxComponent,
    RadioComponent,
    ButtonComponent,
    SwitchComponent
  ],
})
export class DynamicFormsModule {}
