import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DialogEditEventArgs,
  SaveEventArgs,
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
  ContextMenuItem,
} from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Subject, Subscription } from 'rxjs';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss'],
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
  public language: any;
  public loader = false;
  public subscription!: Subscription;
  private unsubscribe: Subject<null> = new Subject();

  constructor(
    private configurationService: ConfigurationService,
    private apiService: CallApiService,
    private helpService: HelpService,
    private toastr: ToastrComponent,
    private routerNavigate: Router,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.initializeConfig();
    this.subscribeMessageServices();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.helpService.getHeightForGridWithoutPx();
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.height = this.helpService.getHeightForGridWithoutPx();
        this.loader = false;
        this.callApi(data);
      });
  }

  subscribeMessageServices() {
    this.subscription = this.messageService.getRefreshGrid().subscribe(() => {
      this.callApi(this.config);
      setTimeout(() => {
        this.operations.dialog.close();
      }, 50);
    });
    // this.messageService.getRefreshGrid().subscribe(() => {
    //   this.callApi(this.config);
    //   this.operations.dialog.close();
    // });
  }

  callApi(data: any) {
    setTimeout(() => {
      this.grid.showSpinner();
    }, 100);

    if (data.type === 'POST') {
      this.callApiPost(data.request.api, data.body);
    } else {
      if (data.request.url) {
        const dataValue = this.helpService.getRequestDataParameters(
          this.router.snapshot.params,
          data.request.url
        );
        this.callApiGet(data.request.api, dataValue);
      } else {
        const dataValue = this.helpService.getRequestDataParameters(
          this.router.snapshot.params,
          data.request.parameters
        );
        this.callApiGet(data.request.api, dataValue);
      }
    }
  }

  callApiPost(api: string, body: any) {
    this.apiService.callPostMethod(api, body).subscribe((data) => {
      this.grid.hideSpinner();
    });
  }

  callApiGet(api: string, parameters?: string) {
    this.apiService.callGetMethod(api, parameters!).subscribe((data) => {
      this.data = data;
      setTimeout(() => {
        this.grid.hideSpinner();
      }, 100);
    });
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog!.buttons = [];
      if (this.config.width) {
        args.dialog!.width = this.config.width;
      }
      if (args.requestType === 'add') {
        args.dialog!.header = this.language.gridPopupAddTitle;
      } else if (args.requestType === 'beginEdit') {
        args.dialog!.header = this.language.gridPopupEditTitle;
      }
      if (this.config.config) {
        setTimeout(() => {
          this.setValue(this.config.config, args.rowData);
        }, 50);
      }
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
      if (request.url) {
        data = this.helpService.postRequestDataParameters(
          data,
          this.router.snapshot.params,
          request.url
        );
      }
      this.apiService.callPostMethod(request.api, data).subscribe((res) => {
        if (res) {
          this.callApi(this.config);
          this.toastr.showSuccess();
        } else {
          this.toastr.showError();
        }
      });
    } else {
      this.apiService.callGetMethod(request.api, data).subscribe((res) => {
        if (res) {
          this.callApi(this.config);
          this.toastr.showSuccess();
        } else {
          this.toastr.showError();
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

  openPage(link: string, parameters: string[], data: any) {
    const linkWithParameters = this.helpService.concatenatePageLink(
      link,
      parameters,
      data
    );
    this.routerNavigate.navigate([linkWithParameters]);
  }

  unsuscribeME(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnDestroy(): void {
    this.unsuscribeME();
  }
}
