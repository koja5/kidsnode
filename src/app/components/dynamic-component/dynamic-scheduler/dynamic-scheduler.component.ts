import {
  Component,
  Input,
  OnInit,
  Inject,
  ViewChild,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import {
  ScheduleComponent,
  EventSettingsModel,
  View,
  EventRenderedArgs,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  ResizeService,
  DragAndDropService,
  YearService,
  AgendaService,
  TimelineViewsService,
  TimelineMonthService,
  TimelineYearService,
  ExcelExportService,
  PrintService,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { ActionCompleteEventArgs } from '@syncfusion/ej2-inputs';
import { ScheduleModel } from 'src/app/models/schedule-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { FieldConfig } from '../dynamic-forms/models/field-config';
import { FormConfig } from '../dynamic-forms/models/form-config';

@Component({
  selector: 'app-dynamic-scheduler',
  templateUrl: './dynamic-scheduler.component.html',
  styleUrls: ['./dynamic-scheduler.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    YearService,
    AgendaService,
    TimelineViewsService,
    TimelineMonthService,
    TimelineYearService,
    ResizeService,
    DragAndDropService,
    ExcelExportService,
    PrintService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicSchedulerComponent implements OnInit {
  @Input() path!: string;
  @Input() file!: string;
  @ViewChild(DynamicFormsComponent) form!: DynamicFormsComponent;

  public eventSettings: EventSettingsModel = {};
  public config?: ScheduleModel;
  public loader = false;
  public language?: any;
  public height?: number;
  public selectedData?: any;
  public configField!: FieldConfig[];
  public config1!: FormConfig;
  public data = [];

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private callApiService: CallApiService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.initializeConfig();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.helpService.getHeightForSchedulerWithoutPx();
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.getData();
        this.height = this.helpService.getHeightForSchedulerWithoutPx();
      });
  }

  getData() {
    this.callApiService.callGetMethod(this.config!.request!.api, '').subscribe(
      (data) => {
        if (data) {
          this.eventSettings.dataSource = data as [];
        } else {
          this.eventSettings.dataSource = [];
        }
        this.loader = false;
      },
      (error) => {
        this.eventSettings.dataSource = [];
        this.loader = false;
      }
    );
  }

  onPopupOpen(event: PopupOpenEventArgs) {
    if (event.type === 'QuickInfo') {
      this.selectedData = event.data;
      this.setValue(this.config?.config, this.selectedData);
    } else if (event.type === 'Editor') {
    }
  }

  actionComplete(event: any) {
    if (event.requestType === 'eventCreated') {
      this.createData(event.addedRecords);
    } else if (event.requestType === 'eventChanged') {
      this.updateData(event.changedRecords);
    } else if (event.requestType === 'eventDeleted') {
      this.deleteData(event.deletedRecords);
    }
  }

  createData(data: any) {
    // this.callApi(this.config!.editSettingsRequest!.add, data);
  }

  updateData(data: any) {
    this.callApi(this.config!.editSettingsRequest!.edit, data);
  }

  deleteData(data: any) {
    this.callApi(this.config!.editSettingsRequest!.delete, data);
  }

  callApi(request: any, data: any, toastr?: true) {
    if (request.type.toUpperCase() === 'POST') {
      this.callApiService.callPostMethod(request.api, data).subscribe(
        (data) => {
          if (data) {
            if (toastr) {
              return true;
            } else {
              return data;
            }
          } else {
            return false;
          }
        },
        (error) => {
          return false;
        }
      );
    } else {
      this.callApiService.callGetMethod(request.api, data).subscribe(
        (data) => {
          if (data) {
            if (toastr) {
              return false;
            } else {
              return data;
            }
          } else {
            return false;
          }
        },
        (error) => {
          return false;
        }
      );
    }
  }

  setValue(fields: any, values: any) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].schedule) {
        this.form.setValue(
          fields[i].schedule['name'],
          values[fields[i].schedule['name']]
        );
        this.config!.config![i].value = values[fields[i].schedule['name']];
      } else {
        this.form.setValue(fields[i]['name'], values[fields[i]['name']]);
        this.config!.config![i].value = values[fields[i].schedule['name']];
      }
    }
  }
}
