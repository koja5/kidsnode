import { Component, Input, OnInit } from '@angular/core';
import { InvoiceModel } from '../../../models/invoice-model';

const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HelpService } from 'src/app/services/help.service';
import { ProductItemModel } from 'src/app/models/product-item-model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dynamic-invoice',
  templateUrl: './dynamic-invoice.component.html',
  styleUrls: ['./dynamic-invoice.component.scss'],
})
export class DynamicInvoiceComponent implements OnInit {
  // invoice = new InvoiceModel();
  @Input() invoice!: InvoiceModel;
  @Input() action!: string;
  public language: any;

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.generatePDF(this.action);
  }

  generatePDF(action: string) {
    let docDefinition = {
      content: [
        {
          columns: [
            [
              {
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
      pdfMake.createPdf(docDefinition).download(this.invoice.customerName);
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  addProduct() {
    this.invoice.products.push(new ProductItemModel());
  }
}
