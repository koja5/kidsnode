import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenInvoicesComponent } from '../children-invoices/children-invoices.component';
import { CustomInvoiceFormComponent } from '../custom-invoice-form/custom-invoice-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'children-invoices',
    pathMatch: 'full',
  },
  {
    path: 'children-invoices',
    component: ChildrenInvoicesComponent,
  },
  {
    path: 'invoice-form',
    component: CustomInvoiceFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRouting {}
