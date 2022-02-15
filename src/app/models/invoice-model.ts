import { ProductItemModel } from './product-item-model';

export class InvoiceModel {
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;
  phone!: string;

  products: ProductItemModel[] = [];
  additionalDetails!: string;

  constructor() {
    this.products.push(new ProductItemModel());
  }
}
