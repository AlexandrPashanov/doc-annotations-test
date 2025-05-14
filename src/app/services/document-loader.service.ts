import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentLoaderService {
  document$: WritableSignal<{
    name: string,
    pages: { number: number, imageUrl: string }[],
    annotations: any[]
  } | null> = signal(null);

  constructor() { }

  loadDocument(documentId: string) {
    console.log('documentId', documentId);
    this.document$.set(null);
    if (!documentId) return;
    console.log('loading document', documentId);
    this.document$.set(null)
  }

}
