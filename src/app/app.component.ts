import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService, TuiGroup,
  TuiHint,
  TuiHintDirective,
  TuiIcon,
  TuiRoot, TuiTextfield
} from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DocumentLoaderService } from './services/document-loader.service';
import { TuiTextarea, TuiTextareaLimit, TuiTooltip } from '@taiga-ui/kit';
import { DocumentViewerService } from './services/document-viewer.service';
import { tuiClamp, TuiZoom, TuiZoomEvent } from '@taiga-ui/cdk';
import { map, Observable, scan, startWith, Subject, Subscriber, Subscription } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { AnnotationsService, AnnotationType } from './services/annotations.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiIcon, TuiHintDirective, AsyncPipe, DecimalPipe, TuiButton, TuiGroup, TuiTextfield, TuiTextarea, TuiTextareaLimit, ReactiveFormsModule, FileSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly dialogs = inject(TuiDialogService);

  constructor(public documentViewerService: DocumentViewerService, public annotationsService: AnnotationsService, private router: Router) {}

  protected openAnnotationDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {size: 'l'}).subscribe();
  }

  addAnnotation(observer: Subscriber<unknown>): void {
    observer.complete();
    this.annotationsService.addListener();
  }

  selectPicture(file: File) {
    console.log('addPicture');
    this.annotationsService.annotationControl.setValue(file);
  }

  saveChanges(): void {
    console.log('saveChanges');
  }

  loadDocument(file: File): void {
      this.router.navigate([`viewer/${this.getFileIdFromFileName(file.name)}`]);
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
    return fileName.substring(0, fileName.lastIndexOf('.'));
  }
}
