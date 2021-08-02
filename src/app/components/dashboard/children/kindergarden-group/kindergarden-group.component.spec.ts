import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenGroupComponent } from './kindergarden-group.component';

describe('KindergardenGroupComponent', () => {
  let component: KindergardenGroupComponent;
  let fixture: ComponentFixture<KindergardenGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindergardenGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergardenGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
