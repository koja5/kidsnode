import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInvoiceFormComponent } from './custom-invoice-form.component';

describe('CustomInvoiceFormComponent', () => {
  let component: CustomInvoiceFormComponent;
  let fixture: ComponentFixture<CustomInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
