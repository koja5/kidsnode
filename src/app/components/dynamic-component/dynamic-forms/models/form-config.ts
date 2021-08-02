import { FieldConfig } from "./field-config"
import { FieldsWithAdditionalInfo } from "./fields-with-additional-info";

export class FormConfig {
    additionalInfo?: FieldsWithAdditionalInfo;
    config?: FieldConfig[];
}