import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingKindergardenProfileComponent } from './setting-kindergarden-profile.component';

describe('SettingGeneralComponent', () => {
  let component: SettingKindergardenProfileComponent;
  let fixture: ComponentFixture<SettingKindergardenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingKindergardenProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingKindergardenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
