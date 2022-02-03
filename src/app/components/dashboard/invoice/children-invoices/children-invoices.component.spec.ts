import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenInvoicesComponent } from './children-invoices.component';

describe('ChildrenInvoicesComponent', () => {
  let component: ChildrenInvoicesComponent;
  let fixture: ComponentFixture<ChildrenInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
