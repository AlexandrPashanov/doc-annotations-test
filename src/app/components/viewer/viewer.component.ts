import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentLoaderService } from '../../services/document-loader.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-viewer',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent implements OnInit {

  constructor(public router: ActivatedRoute, public docLoaderService: DocumentLoaderService) {}

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.docLoaderService.loadDocument(params.get('id') || '')
    });
  }

}
