import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralContractsComponent } from './general-contracts.component';

describe('GeneralContractsComponent', () => {
  let component: GeneralContractsComponent;
  let fixture: ComponentFixture<GeneralContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
