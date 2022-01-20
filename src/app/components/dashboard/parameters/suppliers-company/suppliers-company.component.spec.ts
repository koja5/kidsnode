import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCompanyComponent } from './suppliers-company.component';

describe('SuppliersCompanyComponent', () => {
  let component: SuppliersCompanyComponent;
  let fixture: ComponentFixture<SuppliersCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
