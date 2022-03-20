import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelOwnerComponent } from './control-panel-owner.component';

describe('ControlPanelChildrensComponent', () => {
  let component: ControlPanelOwnerComponent;
  let fixture: ComponentFixture<ControlPanelOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlPanelOwnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
