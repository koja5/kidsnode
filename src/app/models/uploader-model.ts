import { FieldConfig } from "../components/dynamic-component/dynamic-forms/models/field-config";

export class UploaderModel {
    saveUrl?: string;
    removeUrl?: string;
    requiredBaseData?: boolean;
    autoUpload?: boolean;
    config?: FieldConfig[];
    url?: string[];

}