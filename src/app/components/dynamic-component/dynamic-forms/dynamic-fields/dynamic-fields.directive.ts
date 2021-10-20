import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../models/field';
import { FieldConfig } from '../models/field-config';
import { ButtonComponent } from './buttons/button/button.component';
import { CheckboxComponent } from './buttons/checkbox/checkbox.component';
import { RadioComponent } from './buttons/radio/radio.component';
import { ComboboxComponent } from './dropdowns/combobox/combobox.component';
import { MultiselectComponent } from './dropdowns/multiselect/multiselect.component';
import { DatepickerComponent } from './inputs/datepicker/datepicker.component';
import { DatetimepickerComponent } from './inputs/datetimepicker/datetimepicker.component';
import { TextBoxComponent } from './inputs/text-box/text-box.component';
import { LabelComponent } from './text/label/label.component';

const components: {[type: string]: Type<Field>} = {
  textbox: TextBoxComponent,
  password: TextBoxComponent,
  combobox: ComboboxComponent,
  multiselect: MultiselectComponent,
  button: ButtonComponent,
  radio: RadioComponent,
  checkbox: CheckboxComponent,
  datepicker: DatepickerComponent,
  datetimepicker: DatetimepickerComponent,
  label: LabelComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldsDirective implements Field, OnChanges, OnInit {
  @Input()
  config!: FieldConfig;

  @Input()
  group!: FormGroup;

  @Input()
  data: any;

  component!: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}