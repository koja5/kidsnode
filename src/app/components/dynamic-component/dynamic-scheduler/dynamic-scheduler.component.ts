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

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.initializeConfig();

    this.configField = [
      {
        type: 'textbox',
        name: 'Subject',
        schedule: {
          type: 'text',
          title: 'Subject',
          width: 'col-md-12',
          class: 'e-field e-input e-control e-textbox e-lib e-input',
          name: 'Subject',
        },
      },
      {
        type: 'textbox',
        name: 'Owner',
        schedule: {
          type: 'text',
          title: 'Owner',
          width: 'col-md-12',
          class: 'e-field e-input e-control e-textbox e-lib e-input',
          name: 'Owner',
        },
      },
      {
        type: 'textbox',
        name: 'StartTime',
        schedule: {
          type: 'text',
          title: 'StartTime',
          width: 'col-md-12',
          class: 'e-field e-input e-control e-textbox e-lib e-input',
          name: 'StartTime',
        },
      },
      {
        type: 'textbox',
        name: 'EndTime',
        schedule: {
          type: 'text',
          title: 'EndTime',
          width: 'col-md-12',
          class: 'e-field e-input e-control e-textbox e-lib e-input',
          name: 'EndTime',
        },
      },
      {
        type: 'combobox',
        width: 'col-md-12',
        class: 'e-outline',
        fieldClass: 'e-field e-input e-lib e-keyboard',
        name: 'kindergarden_group_id',
        title: 'Kindergarden group',
        field: { text: 'name', value: 'id' },
        request: {
          type: 'GET',
          api: '/api/getKindergardenGroupByKindergardenId',
          fields: '',
          root: '',
        },
        placeholder: 'Please select kindergarden group',
        fieldConfig: {
          ignoreAccent: false,
          filter: true,
        },
        required: true,
        schedule: {
          type: 'combobox',
          name: 'kindergarden_group_id',
          title: 'Kindergarden group',
          class: 'e-field e-input e-lib e-keyboard',
        },
      },
      {
        type: 'multiselect',
        width: 'col-md-12',
        class: 'e-outline',
        fieldClass: 'e-field e-input',
        name: 'Kinder',
        title: 'Kindergarden group',
        field: { text: 'name', value: 'id' },
        request: {
          type: 'GET',
          api: '/api/getKindergardenGroupByKindergardenId',
          fields: '',
          root: '',
        },
        placeholder: 'Please select kindergarden group',
        fieldConfig: {
          ignoreAccent: false,
          filter: true,
        },
        required: true,
        schedule: {
          type: 'multiselect',
          name: 'Kinder',
          title: 'Kindergarden group',
          class: 'e-field e-input e-lib e-keyboard',
        },
      },
    ];
    this.config1 = {
      config: this.configField,
    };
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
        this.height = this.helpService.getHeightForSchedulerWithoutPx();
        this.loader = false;
      });
  }

  onPopupOpen(event: PopupOpenEventArgs) {
    if (event.type === 'QuickInfo') {
      this.selectedData = event.data;
      this.setValue(this.configField, this.selectedData);
    } else if (event.type === 'Editor') {
    }
  }

  actionComplete(event: ActionCompleteEventArgs) {
    console.log(event);
  }

  setValue(fields: any, values: any) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].schedule) {
        this.form.setValue(
          fields[i].schedule['name'],
          values[fields[i].schedule['name']]
        );
        this.configField[i].value = values[fields[i].schedule['name']];
      } else {
        this.form.setValue(fields[i]['name'], values[fields[i]['name']]);
        this.configField[i].value = values[fields[i].schedule['name']];
      }
    }
  }
}
