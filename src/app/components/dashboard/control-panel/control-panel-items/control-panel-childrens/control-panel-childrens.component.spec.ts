import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelChildrensComponent } from './control-panel-childrens.component';

describe('ControlPanelChildrensComponent', () => {
  let component: ControlPanelChildrensComponent;
  let fixture: ComponentFixture<ControlPanelChildrensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelChildrensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelChildrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
