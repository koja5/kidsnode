import { Request } from "../components/dynamic-component/dynamic-forms/models/complex-properties/request";
import { FieldConfig } from "../components/dynamic-component/dynamic-forms/models/field-config";
import { EditSettingsRequestModel } from "./edit-settings-request-model";
import { SchedulerEditOptionsModel } from "./scheduler-edit-options-model";
import { SchedulerModelResources } from "./scheduler-model-resources";
import { SchedulerToolbarModel } from "./scheduler-toolbar";
import { SchedulerTooltipModel } from "./scheduler-tooltip-model";
import { SubmitValueModelScheduler } from "./submit-value-model-scheduler";

export class ScheduleModel {
    views?: string[];
    showQuickInfo?: boolean;
    currentView?: string[];
    dateFormat?: Date;
    readonly?: boolean;
    showWeekend?: boolean;
    group?: any;
    workDays?: number[];
    displayName?: string;
    interval?: number;
    startHour?: string;
    endHour?: string;
    timeScale?: any;
    showWeekNumber?: boolean;
    allowVirtualScrolling?: boolean;
    config?: FieldConfig[];
    cellTemplate?: string[];
    request?: Request;
    editSettingsRequest?: EditSettingsRequestModel;
    resources?: SchedulerModelResources;
    convertSubmitValue?: SubmitValueModelScheduler[];
    displayFieldForSubject?: string[];
    toolbar?: SchedulerToolbarModel;
    tooltip?: SchedulerTooltipModel;
    editOptions?: SchedulerEditOptionsModel;

}