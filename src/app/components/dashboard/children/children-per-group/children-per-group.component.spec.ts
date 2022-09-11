import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenPerGroupComponent } from './children-per-group.component';

describe('ChildrenPerGroupComponent', () => {
  let component: ChildrenPerGroupComponent;
  let fixture: ComponentFixture<ChildrenPerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenPerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenPerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
