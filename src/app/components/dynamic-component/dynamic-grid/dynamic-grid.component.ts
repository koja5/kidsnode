import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DialogEditEventArgs,
  SaveEventArgs,
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
  ContextMenuItem,
} from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.sass'],
})
export class DynamicGridComponent implements OnInit {
  @Input() path!: string;
  @Input() file!: string;
  @ViewChild(DynamicFormsComponent) form!: DynamicFormsComponent;
  @ViewChild('grid') public grid!: GridComponent;
  @ViewChild('orderForm') public orderForm!: FormGroup;
  @ViewChild('editSettingsTemplate') editSettingsTemplate!: DialogComponent;
  @ViewChild('container') public container!: ElementRef;

  public config: any;
  public data: any;
  public height!: number;
  public typeOfModification = 'add';
  public operations: any;

  constructor(
    private configurationService: ConfigurationService,
    private apiService: CallApiService,
    private helpService: HelpService,
    private toastr: ToastrComponent
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.helpService.getHeightForGridWithoutPx();
  }

  initializeConfig() {
    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.height = this.helpService.getHeightForGridWithoutPx();
        this.callApi(data);
      });
  }

  callApi(data: any) {
    setTimeout(() => {
      this.grid.showSpinner();
    }, 100);

    if (data.type === 'POST') {
      this.callApiPost(data.request.api, data.body);
    } else {
      this.callApiGet(data.request.api, data.parameters);
    }
  }

  callApiPost(api: string, body: any) {
    this.apiService.callPostMethod(api, body).subscribe((data) => {
      this.grid.hideSpinner();
    });
  }

  callApiGet(api: string, parameters?: string) {
    this.apiService.callGetMethod(api, '1').subscribe((data) => {
      this.data = data;
      this.grid.hideSpinner();
    });
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog!.buttons = [];
      setTimeout(() => {
        this.setValue(this.config.config, args.rowData);
      }, 50);
    }

    if (args.requestType === 'delete') {
      this.deleteData(args);
    }

    this.typeOfModification = args.requestType as string;
    this.operations = args;
    args.cancel = true;
  }

  submitEmitter(event: any) {
    if (this.typeOfModification === 'add') {
      this.callServerMethod(this.config.editSettingsRequest.add, event);
    } else if (this.typeOfModification === 'beginEdit') {
      this.callServerMethod(this.config.editSettingsRequest.edit, event);
    }

    this.operations.dialog.close();
  }

  callServerMethod(request: any, data: any) {
    if (request.type === 'POST') {
      this.apiService.callPostMethod(request.api, data).subscribe((res) => {
        if (res) {
          this.callApi(this.config);
          this.toastr.showSuccess('Action is successed executed!');
        } else {
          this.toastr.showError('Action is not successed executed!');
        }
      });
    } else {
      this.apiService.callGetMethod(request.api, data).subscribe((res) => {
        if (res) {
          this.callApi(this.config);
          this.toastr.showSuccess('Action is successed executed!');
        } else {
          this.toastr.showError('Action is not successed executed!');
        }
      });
    }
  }

  deleteData(event: any) {
    for (let i = 0; i < event.data.length; i++) {
      this.callServerMethod(
        this.config.editSettingsRequest.delete,
        event.data[i]
      );
    }
  }

  setValue(fields: any, values: any) {
    for (let i = 0; i < fields.length; i++) {
      this.form.setValue(fields[i]['name'], values[fields[i]['name']]);
    }
  }
}
