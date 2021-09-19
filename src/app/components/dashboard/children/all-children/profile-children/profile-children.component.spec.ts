import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChildrenComponent } from './profile-children.component';

describe('ProfileChildrenComponent', () => {
  let component: ProfileChildrenComponent;
  let fixture: ComponentFixture<ProfileChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
