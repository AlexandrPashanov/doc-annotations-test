import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDocument } from '../interfaces/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentLoaderService {
  constructor(private httpClient: HttpClient) { }

  loadDocument(documentId: string): Observable<IDocument> {
    return this.httpClient.get<IDocument>(`assets/documents/${documentId}.json`);
  }

}
