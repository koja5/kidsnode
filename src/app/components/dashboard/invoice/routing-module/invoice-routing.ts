import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenInvoicesComponent } from '../children-invoices/children-invoices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'children-invoices',
    pathMatch: 'full',
  },
  {
    path: 'children-invoices',
    component: ChildrenInvoicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRouting {}
