import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiGroup,
  TuiHintDirective,
  TuiIcon, TuiRoot,
  TuiTextfield
} from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TuiTextarea, TuiTextareaLimit } from '@taiga-ui/kit';
import { DocumentViewerService } from './services/document-viewer.service';
import { Subscriber } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { AnnotationsService } from './services/annotations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiIcon, TuiHintDirective, AsyncPipe, DecimalPipe, TuiButton, TuiGroup, TuiTextfield, TuiTextarea, TuiTextareaLimit, ReactiveFormsModule, FileSelectorComponent, TuiRoot],
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
    this.annotationsService.annotationControl.setValue(file);
  }

  saveChanges(): void {
    const documentInfo = this.documentViewerService.document$();
    if (documentInfo) {
      documentInfo.annotations = this.annotationsService.addedAnnotations;
    }
    console.log('Document information', documentInfo);
  }

  loadDocument(file: File): void {
    this.router.navigate([`viewer/${this.getFileIdFromFileName(file.name)}`]);
  }

  closeDocument(): void {
    this.documentViewerService.document$.set(null);
    this.documentViewerService.documentId$.set('');
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
