import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPieComponent } from './dynamic-pie.component';

describe('DynamicPieComponent', () => {
  let component: DynamicPieComponent;
  let fixture: ComponentFixture<DynamicPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
