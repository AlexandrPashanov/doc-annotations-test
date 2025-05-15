import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export interface IDocument {
  name: string,
  pages: IPage[],
  annotations: any[]
}

export interface IPage {
  number: number,
  imageUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class DocumentLoaderService {
  document$: WritableSignal<IDocument | null> = signal(null);
  loadedId$: WritableSignal<string> = signal('');

  constructor(private httpClient: HttpClient) { }

  loadDocument(documentId: string) {
    console.log('documentId', documentId);
    this.loadedId$.set(documentId);
    this.document$.set(null);
    if (!documentId) return;
    console.log('loading document', documentId);
    this.httpClient.get(`assets/documents/${documentId}.json`)
      .pipe(catchError(err => {
        return of(null);
      }))
      .subscribe((response: any) => {
        if (response && response.pages?.length && typeof response.name === 'string') {
          this.document$.set(response);
        } else {
          this.document$.set(null);
        }
      })
  }

}
