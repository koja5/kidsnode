import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenSubgroupComponent } from './kindergarden-subgroup.component';

describe('KindergardenSubgroupComponent', () => {
  let component: KindergardenSubgroupComponent;
  let fixture: ComponentFixture<KindergardenSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindergardenSubgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergardenSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
