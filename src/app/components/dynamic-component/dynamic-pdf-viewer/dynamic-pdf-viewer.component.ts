import { Component, OnInit } from '@angular/core';
import {
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  AnnotationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
} from '@syncfusion/ej2-angular-pdfviewer';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-dynamic-pdf-viewer',
  templateUrl: './dynamic-pdf-viewer.component.html',
  styleUrls: ['./dynamic-pdf-viewer.component.scss'],
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    AnnotationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
  ],
})
export class DynamicPdfViewerComponent implements OnInit {

  constructor(private callApi: CallApiService) {}

  ngOnInit(): void {
  }
}
