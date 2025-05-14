import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentLoaderService {
  document$: WritableSignal<{
    name: string,
    pages: { number: number, imageUrl: string }[],
    annotations: any[]
  } | null> = signal(null);
  loadedId$: WritableSignal<string> = signal('');

  constructor(private httpClient: HttpClient) { }

  loadDocument(documentId: string) {
    console.log('documentId', documentId);
    this.loadedId$.set(documentId);
    this.document$.set(null);
    if (!documentId) return;
    console.log('loading document', documentId);
    this.document$.set(null)
  }

}
