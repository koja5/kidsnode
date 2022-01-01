import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import {
  ScheduleComponent,
  EventSettingsModel,
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
  ActionEventArgs,
  ToolbarActionArgs,
  ExportOptions,
} from '@syncfusion/ej2-angular-schedule';
import { ScheduleModel } from 'src/app/models/schedule-model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../common/toastr/toastr.component';
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
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  public eventSettings: EventSettingsModel = {};
  public config?: ScheduleModel;
  public loader = false;
  public language?: any;
  public height?: number;
  public selectedData?: any;
  public data = [];
  public resources: any[] = [];

  constructor(
    private configurationService: ConfigurationService,
    private helpService: HelpService,
    private callApiService: CallApiService,
    private toastr: ToastrComponent
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
        this.getResources();
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
      },
      (error) => {
        this.eventSettings.dataSource = [];
        this.loader = false;
      }
    );
  }

  getResources() {
    this.loader = true;
    if (this.config?.resources) {
      this.callApiService
        .callGetMethod(this.config!.resources.request!.api, '')
        .subscribe(
          (data) => {
            this.resources = data as [];
            this.loader = false;
          },
          (error) => {
            this.resources = [];
          }
        );
    } else {
      this.loader = false;
    }
  }

  onPopupOpen(event: PopupOpenEventArgs) {
    if (event.type === 'QuickInfo') {
      this.selectedData = event.data;
      setTimeout(() => {
        this.setValue(this.config?.config, this.selectedData);
      }, 50);
    } else if (event.type === 'Editor') {
    }
  }

  actionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      if (this.config?.toolbar?.exportToExcel) {
        const exportItem: ItemModel = {
          align: 'Right',
          showTextOn: 'Both',
          prefixIcon: 'e-icon-schedule-excel-export',
          text: this.language.exportToExcelScheduler,
          cssClass: 'e-excel-export',
          click: this.exportExcel.bind(this),
        };
        args.items!.push(exportItem);
      }
      if (this.config?.toolbar?.print) {
        const print: ItemModel = {
          align: 'Right',
          showTextOn: 'Both',
          prefixIcon: 'e-icon-schedule-print',
          text: this.language.printScheduler,
          cssClass: 'e-print',
          click: this.printScheduler.bind(this),
        };
        args.items!.push(print);
      }
    }
  }

  actionComplete(event: any) {
    if (event.requestType === 'eventCreated') {
      this.createData(event.addedRecords[0]);
    } else if (event.requestType === 'eventChanged') {
      this.updateData(event.changedRecords[0]);
    } else if (event.requestType === 'eventRemoved') {
      this.deleteData(event.deletedRecords[0]);
    }
  }

  createData(data: any) {
    data = this.convertSubmitValue(data);
    this.callApi(this.config!.editSettingsRequest!.add, data);
  }

  updateData(data: any) {
    delete data.Id;
    data = this.convertSubmitValue(data);
    this.callApi(this.config!.editSettingsRequest!.edit, data);
    const index = (this.eventSettings.dataSource as []).findIndex(
      (x) => x['id'] == data.id
    );
    (this.eventSettings.dataSource as any[])[index] = data;
  }

  deleteData(data: any) {
    delete data.Id;
    this.callApi(this.config!.editSettingsRequest!.delete, data);
    const index = (this.eventSettings.dataSource as []).findIndex(
      (x) => x['id'] == data.id
    );
    (this.eventSettings.dataSource as []).splice(index, 1);
  }

  callApi(request: any, data: any, toastr?: true) {
    if (request.type.toUpperCase() === 'POST') {
      this.callApiService.callPostMethod(request.api, data).subscribe(
        (data) => {
          if (data) {
            this.toastr.showSuccess();
            if (toastr) {
              this.scheduleObj.refreshEvents();
              return true;
            } else {
              this.scheduleObj.refreshEvents();
              return data;
            }
          } else {
            this.toastr.showError();
            return false;
          }
        },
        (error) => {
          this.toastr.showError();
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
        if (this.form !== undefined) {
          this.form.setValue(
            fields[i]['name'],
            this.helpService.convertValueToSpecificType(
              values[fields[i]['name']],
              this.config!.config![i].type
            )
          );
        }
        this.config!.config![i].value =
          this.helpService.convertValueToSpecificType(
            values[fields[i]['name']],
            this.config!.config![i].type
          );
      } else {
        if (this.form !== undefined) {
          this.form.setValue(
            fields[i]['name'],
            this.helpService.convertValueToSpecificType(
              values[fields[i]['name']],
              this.config!.config![i].type
            )
          );
        }
        this.config!.config![i].value =
          this.helpService.convertValueToSpecificType(
            values[fields[i]['name']],
            this.config!.config![i].type
          );
      }
    }
  }

  convertSubmitValue(data: any) {
    if (this.config?.convertSubmitValue) {
      for (let i = 0; i < this.config?.convertSubmitValue.length; i++) {
        data[this.config.convertSubmitValue[i].field!] =
          this.helpService.convertValueToSpecificType(
            data[this.config.convertSubmitValue[i].field!],
            this.config.convertSubmitValue[i].type ?? ''
          );
      }
    }
    if (this.config?.displayFieldForSubject) {
      data.Subject = '';
      for (let i = 0; i < this.config.displayFieldForSubject.length; i++) {
        if (
          data[this.config?.displayFieldForSubject[i]] !== undefined &&
          data[this.config?.displayFieldForSubject[i]] !== null
        ) {
          data.Subject += data[this.config?.displayFieldForSubject[i]];
        } else {
          data.Subject += this.config?.displayFieldForSubject[i];
        }
      }
    }
    return data;
  }

  exportExcel() {
    this.scheduleObj.exportToExcel();
  }

  printScheduler() {
    this.scheduleObj.print();
  }
}
