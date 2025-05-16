import { Component, OnInit } from '@angular/core';
import { DocumentLoaderService } from '../../services/document-loader.service';
import { DocumentViewerService } from '../../services/document-viewer.service';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(public documentViewerService: DocumentViewerService) {}
}
