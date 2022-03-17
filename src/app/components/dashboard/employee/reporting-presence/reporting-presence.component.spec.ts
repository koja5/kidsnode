import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingPresenceComponent } from './reporting-presence.component';

describe('ReportingPresenceComponent', () => {
  let component: ReportingPresenceComponent;
  let fixture: ComponentFixture<ReportingPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportingPresenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
