import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSuppliersComponent } from './invoice-suppliers.component';

describe('InvoiceSuppliersComponent', () => {
  let component: InvoiceSuppliersComponent;
  let fixture: ComponentFixture<InvoiceSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
