import { Component } from '@angular/core';
import { DocumentLoaderService } from '../../services/document-loader.service';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(public docLoaderService: DocumentLoaderService) {}
}
