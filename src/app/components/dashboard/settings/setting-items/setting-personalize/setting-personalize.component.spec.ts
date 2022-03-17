import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPersonalizeComponent } from './setting-personalize.component';

describe('SettingPersonalizeComponent', () => {
  let component: SettingPersonalizeComponent;
  let fixture: ComponentFixture<SettingPersonalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPersonalizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPersonalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
