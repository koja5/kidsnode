import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBrandComponent } from './loader-brand.component';

describe('LoaderBrandComponent', () => {
  let component: LoaderBrandComponent;
  let fixture: ComponentFixture<LoaderBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
