import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicModuleModule } from 'src/app/components/dynamic-component/dynamic-module/dynamic-module.module';
import { ChildrenInvoicesComponent } from '../children-invoices/children-invoices.component';
import { CustomInvoiceFormComponent } from '../custom-invoice-form/custom-invoice-form.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { InvoiceRouting } from './invoice-routing';

@NgModule({
  declarations: [
    InvoiceComponent,
    ChildrenInvoicesComponent,
    CustomInvoiceFormComponent,
  ],
  imports: [FormsModule, CommonModule, InvoiceRouting, DynamicModuleModule],
  providers: [],
})
export class InvoiceModule {}
