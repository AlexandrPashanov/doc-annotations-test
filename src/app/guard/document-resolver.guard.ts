import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router
} from '@angular/router';
import { DocumentLoaderService } from '../services/document-loader.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { IDocument } from '../interfaces/document.interface';
import { DocumentViewerService } from '../services/document-viewer.service';

export const documentResolver: ResolveFn<IDocument> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const documentViewerService = inject(DocumentViewerService);
  return inject(DocumentLoaderService)
    .loadDocument(route.paramMap.get('id') ?? '')
    .pipe(
      catchError(() => {
        documentViewerService.documentId$.set('');
        documentViewerService.document$.set(null);
        return of(
          new RedirectCommand(router.createUrlTree(['/'])),
        )}
      ),
    );
};
