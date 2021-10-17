import { ValidatorFn } from "@angular/forms";
import { Request } from "./complex-properties/request";
import { DropDown } from "./specific-property/dropdown";

export class FieldConfig {
  title?: string;
  text?: string;
  class?: string;
  fieldClass?: string;
  width?: string;
  field?: any;
  rows?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  floatLabel?: string;
  name!: string;
  options?: string[];
  placeholder?: string;
  type!: string;
  validation?: ValidatorFn[];
  value?: any;
  multiline?: boolean;
  request?: Request;
  data?: any;
  dataArray?: any[];
  fieldConfig?: DropDown;
  positionClass?: string;
  onLabel?: string;
  offLabel?: string;
  itemFields?: FieldConfig;
  schedule?: FieldConfig;
}
