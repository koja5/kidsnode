import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfWorkComponent } from './type-of-work.component';

describe('TypeOfWorkComponent', () => {
  let component: TypeOfWorkComponent;
  let fixture: ComponentFixture<TypeOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
