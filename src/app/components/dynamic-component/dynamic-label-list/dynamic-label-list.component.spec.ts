import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLabelListComponent } from './dynamic-label-list.component';

describe('DynamicLabelListComponent', () => {
  let component: DynamicLabelListComponent;
  let fixture: ComponentFixture<DynamicLabelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicLabelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
