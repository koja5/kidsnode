import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEmployeeProfileComponent } from './setting-employee-profile.component';

describe('SettingEmployeeProfileComponent', () => {
  let component: SettingEmployeeProfileComponent;
  let fixture: ComponentFixture<SettingEmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingEmployeeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
