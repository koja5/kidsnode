import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOfActivityComponent } from './calendar-of-activity.component';

describe('CalendarOfActivityComponent', () => {
  let component: CalendarOfActivityComponent;
  let fixture: ComponentFixture<CalendarOfActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarOfActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOfActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
