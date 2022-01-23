import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicControlPanelComponent } from './dynamic-control-panel.component';

describe('DynamicControlPanelComponent', () => {
  let component: DynamicControlPanelComponent;
  let fixture: ComponentFixture<DynamicControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
