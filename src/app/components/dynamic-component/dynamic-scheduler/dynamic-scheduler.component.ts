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
  public configField = {
    config: [
      {
        type: 'textbox',
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
        class: 'e-outline e-field',
        name: 'kindergarden_group_id',
        title: 'Kindergarden group',
        field: { text: 'name', value: 'id' },
        request: {
          type: 'GET',
          api: '/api/getKindergardenGroupByKindergardenId',
          parameters: [],
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
          title: 'Kindergarden group',
          class: 'e-field e-input e-lib e-keyboard',
        },
      },
      {
        type: 'multiselect',
        width: 'col-md-12',
        class: 'e-outline',
        fieldClass: 'e-field e-input',
        name: 'kindergarden_multi',
        title: 'Kindergarden group',
        field: { text: 'name', value: 'id' },
        request: {
          type: 'GET',
          api: '/api/getKindergardenGroupByKindergardenId',
          parameters: [],
          fields: '',
          root: '',
        },
        placeholder: 'Please select kindergarden group',
        fieldConfig: {
          ignoreAccent: false,
          filter: true,
        },
        required: true,
      },
    ],
  };

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService
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
        this.height = this.helpService.getHeightForSchedulerWithoutPx();
        this.loader = false;
      });
  }

  onPopupOpen(event: PopupOpenEventArgs) {
    console.log(event);
    if (event.type === 'Editor') {
      this.selectedData = event.data;
      setTimeout(() => {
        this.setValue(this.configField.config, this.selectedData);
      }, 500);
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
      } else {
        this.form.setValue(fields[i]['name'], values[fields[i]['name']]);
      }
    }
  }
}
