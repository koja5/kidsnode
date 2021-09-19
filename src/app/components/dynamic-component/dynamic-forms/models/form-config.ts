import { RequestModel } from "src/app/models/request-model";
import { FieldConfig } from "./field-config"
import { FieldsWithAdditionalInfo } from "./fields-with-additional-info";

export class FormConfig {
    request?: RequestModel;
    additionalInfo?: FieldsWithAdditionalInfo;
    config?: FieldConfig[];
}