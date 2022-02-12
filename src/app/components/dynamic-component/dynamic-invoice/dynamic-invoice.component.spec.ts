import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInvoiceComponent } from './dynamic-invoice.component';

describe('DynamicInvoiceComponent', () => {
  let component: DynamicInvoiceComponent;
  let fixture: ComponentFixture<DynamicInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
