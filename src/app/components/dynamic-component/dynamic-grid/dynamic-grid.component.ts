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
  ExcelExportProperties,
  GridComponent,
  PdfExportProperties,
} from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Subject, Subscription } from 'rxjs';
import { CallApiService } from 'src/app/services/call-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HelpService } from 'src/app/services/help.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { saveAs } from 'file-saver';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss'],
})
export class DynamicGridComponent implements OnInit {
  @Input() path!: string;
  @Input() file!: string;
  @Input() partOfTab!: boolean;
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
  public invoice: any = {};
  public invoiceAction!: string;
  public generateInvoice = false;
  public filterOptions!: FilterSettingsModel;

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
    this.filterOptions = {
      type: 'Menu',
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.helpService.getHeightForGridWithoutPx(this.partOfTab);
  }

  initializeConfig() {
    this.language = this.helpService.getLanguage();

    this.configurationService
      .getConfiguration(this.path, this.file)
      .subscribe((data) => {
        this.config = data;
        this.height = this.helpService.getHeightForGridWithoutPx(
          this.partOfTab
        );
        this.loader = false;
        this.enableGridSpinner();
        this.apiService.callApi(this.config, this.router).subscribe((data) => {
          this.setResponseData(data);
        });
      });
  }

  subscribeMessageServices() {
    this.subscription = this.messageService.getRefreshGrid().subscribe(() => {
      this.enableGridSpinner();
      this.apiService.callApi(this.config, this.router).subscribe((data) => {
        this.setResponseData(data);
      });
      setTimeout(() => {
        this.operations.dialog.close();
      }, 50);
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
      if (!this.config.uploadConfig) {
        this.deleteData(args);
      } else {
        this.deleteDocument(args);
      }
    }

    this.typeOfModification = args.requestType as string;
    this.operations = args;
    args.cancel = true;
  }

  submitEmitter(event: any) {
    this.enableGridSpinner();
    if (this.typeOfModification === 'add') {
      this.callServerMethod(this.config.editSettingsRequest.add, event);
    } else if (this.typeOfModification === 'beginEdit') {
      this.callServerMethod(this.config.editSettingsRequest.edit, event);
    }

    this.operations.dialog.close();
  }

  callServerMethod(request: any, event: any) {
    this.apiService
      .callServerMethod(request, event, this.router)
      .subscribe((data: any) => {
        if (data) {
          this.toastr.showSuccess();
          this.apiService
            .callApi(this.config, this.router)
            .subscribe((data) => {
              this.setResponseData(data);
            });
        } else {
          this.toastr.showError();
        }
      });
  }

  setResponseData(data: any) {
    if (this.config.request.type === 'GET') {
      this.data = data;
    }
    this.grid.hideSpinner();
  }

  enableGridSpinner() {
    setTimeout(() => {
      this.grid.showSpinner();
    }, 100);
  }

  disabledGridSpinner() {
    setTimeout(() => {
      this.grid.hideSpinner();
    }, 100);
  }

  deleteData(event: any) {
    for (let i = 0; i < event.data.length; i++) {
      this.callServerMethod(
        this.config.editSettingsRequest.delete,
        event.data[i]
      );
    }
  }

  deleteDocument(event: any) {
    for (let i = 0; i < event.data.length; i++) {
      this.callServerMethod(this.config.uploadConfig.delete, event.data[i]);
    }
  }

  setValue(fields: any, values: any) {
    for (let i = 0; i < fields.length; i++) {
      this.form.setValue(
        fields[i]['name'],
        values[fields[i]['name']],
        fields[i]['type']
      );
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

  downloadDocument(body: any) {
    this.apiService.getDocument(body).subscribe(
      (data: any) => saveAs(data, body.name),
      (error: any) => console.error(error)
    );
  }

  previewDocument(body: any) {
    this.apiService.getDocument(body).subscribe((data: any) => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  getFileTypeIcon(data: any, field: string) {
    return this.helpService.getFileTypeIcon(data[field]);
  }

  clickDropDownButton(event: any, value: any, template: any) {
    if (event.item.properties.id) {
      if (
        template.itemsRequest &&
        template.itemsRequest[event.item.properties.id]
      ) {
        const data = {
          request: template.itemsRequest[event.item.properties.id],
          body: value,
        };
        this.apiService.callApi(data, this.router).subscribe((data) => {
          if (data) {
            this.toastr.showSuccess();
          } else {
            this.toastr.showError();
          }
        });
      } else {
        if (template.fields && template.fields[event.item.properties.id]) {
          for (
            let i = 0;
            i < template.fields[event.item.properties.id].length;
            i++
          ) {
            this.invoice[template.fields[event.item.properties.id][i].key] =
              value[template.fields[event.item.properties.id][i].value];
          }
        }
        this.invoice['products'] = [];
        this.invoiceAction = event.item.properties.id;
        this.generateInvoice = true;
        setTimeout(() => {
          this.generateInvoice = false;
        }, 100);
      }
    }
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.prefixIcon === 'e-excelexport') {
      // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
      const excelExportProperties: ExcelExportProperties = {
        exportType: 'CurrentPage',
      };
      this.grid.excelExport(excelExportProperties);
    } else if (args.item.prefixIcon === 'e-pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        exportType: 'CurrentPage',
      };
      this.grid.pdfExport(pdfExportProperties);
    }
  }
}
