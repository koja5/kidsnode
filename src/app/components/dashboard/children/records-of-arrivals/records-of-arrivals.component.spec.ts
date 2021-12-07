import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsOfArrivalsComponent } from './records-of-arrivals.component';

describe('RecordsOfArrivalsComponent', () => {
  let component: RecordsOfArrivalsComponent;
  let fixture: ComponentFixture<RecordsOfArrivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsOfArrivalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsOfArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
