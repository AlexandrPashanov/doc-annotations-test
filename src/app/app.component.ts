import { TuiHint, TuiHintDirective, TuiIcon, TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DocumentLoaderService } from './services/document-loader.service';
import { TuiTooltip } from '@taiga-ui/kit';
import { DocumentViewerService } from './services/document-viewer.service';
import { tuiClamp, TuiZoom, TuiZoomEvent } from '@taiga-ui/cdk';
import { map, scan, startWith, Subject } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiIcon, TuiHintDirective, AsyncPipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'doc-annotations-test';

  constructor(public documentViewerService: DocumentViewerService, private router: Router) {}

  saveChanges(): void {
    console.log('saveChanges');
  }

  loadDocument(eventTarget: EventTarget | null): void {
    if (!eventTarget) return;
    const file: FileList | null = (eventTarget as HTMLInputElement).files;
    if (file && file.length > 0) {
      this.router.navigate([`viewer/${this.getFileIdFromFileName(file[0].name)}`]);
    }
  }

  closeDocument(): void {
    this.router.navigate([`viewer/`]);
  }

  decreaseZoom(): void {
    this.documentViewerService.onZoom(-0.1)
  }

  increaseZoom(): void {
    this.documentViewerService.onZoom(0.1)
  }

  private getFileIdFromFileName(fileName: string): string {
    return fileName.substring(0,  fileName.lastIndexOf('.'));
  }
}
