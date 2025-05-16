import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { DocumentViewerService } from '../../services/document-viewer.service';

@Component({
  selector: 'app-viewer',
  imports: [
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent implements OnInit {

  constructor(public router: ActivatedRoute, public documentViewerService: DocumentViewerService) { }

  ngOnInit() {
    console.log('ngOnInit', this.router.snapshot.params);
    this.documentViewerService.document$.set(this.router.snapshot.data['document'] || null);
    this.documentViewerService.documentId$.set(this.router.snapshot.params['id'] || null);
  }

}
