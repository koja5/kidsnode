import { FieldConfig } from "../components/dynamic-component/dynamic-forms/models/field-config";

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
}