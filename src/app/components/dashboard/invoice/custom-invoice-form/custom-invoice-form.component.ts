import { Component, OnInit } from '@angular/core';

const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HelpService } from 'src/app/services/help.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  name!: string;
  price!: number;
  qty!: number;
}
class Invoice {
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;
  phone!: string;

  products: Product[] = [];
  additionalDetails!: string;

  constructor() {
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-custom-invoice-form',
  templateUrl: './custom-invoice-form.component.html',
  styleUrls: ['./custom-invoice-form.component.scss'],
})
export class CustomInvoiceFormComponent implements OnInit {
  invoice = new Invoice();
  public language: any;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          columns: [
            [
              {
                //image: 'data:image/jpeg;base64,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',
                //width: 150,
                //height: 50,
                text: 'KidsNode',
                fontSize: 16,
                bold: true,
                alignment: 'left',
                color: '#1E2462',
              },
            ],
            [
              {
                text: this.language.invoiceTitle,
                fontSize: 16,
                bold: true,
                alignment: 'right',
                color: '#1E2462',
              },
            ],
          ],
        },
        {
          text: this.language.invoiceCustomerDetails,
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold: true,
              },
              { text: this.invoice.address },
              { text: this.invoice.phone },
              { text: this.invoice.email },
            ],
            [
              {
                text: `${
                  this.language.invoiceDate
                } : ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
              {
                text: `${this.language.invoiceBillNo} : ${(
                  Math.random() * 1000
                ).toFixed(0)}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: this.language.invoiceOrderDetails,
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                this.language.invoiceProduct,
                this.language.invoicePrice,
                this.language.invoiceQuantity,
                this.language.invoiceAmount,
              ],
              ...this.invoice.products.map((p) => [
                p.name,
                p.price,
                p.qty,
                (p.price * p.qty).toFixed(2),
              ]),
              [
                { text: this.language.invoiceTotalAmount, colSpan: 3 },
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.qty * p.price, 0)
                  .toFixed(2),
              ],
            ],
          },
        },
        {
          text: this.language.invoiceAdditionalDetails,
          style: 'sectionHeader',
        },
        {
          text: this.invoice.additionalDetails,
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [
              {
                text: this.language.invoiceSignature,
                alignment: 'right',
                italics: true,
              },
            ],
          ],
        },
        // {
        //   text: this.language.invoiceTermsandConditions,
        //   style: 'sectionHeader',
        // },
        // {
        //   ul: [this.language.invoiceTermsandConditionsContent],
        // },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  addProduct() {
    this.invoice.products.push(new Product());
  }
}
