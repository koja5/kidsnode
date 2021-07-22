import { FormConfig } from "../components/dynamic-component/dynamic-forms/models/form-config";
import { TitleTextModel } from "./title-text-model";

export class SignUpModel {
    leftSideStep?: TitleTextModel;
    rightSideStep?: TitleTextModel;
    form!: FormConfig;
}