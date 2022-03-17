import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOwnerProfileComponent } from './setting-owner-profile.component';

describe('SettingDirectorProfileComponent', () => {
  let component: SettingOwnerProfileComponent;
  let fixture: ComponentFixture<SettingOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingOwnerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
