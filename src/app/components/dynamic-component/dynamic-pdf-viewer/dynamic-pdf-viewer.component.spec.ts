import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPdfViewerComponent } from './dynamic-pdf-viewer.component';

describe('DynamicPdfViewerComponent', () => {
  let component: DynamicPdfViewerComponent;
  let fixture: ComponentFixture<DynamicPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
