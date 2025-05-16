import { Injectable, signal, WritableSignal } from '@angular/core';
import { IDocument } from '../interfaces/document.interface';
import { map, scan, startWith, Subject } from 'rxjs';
import { tuiClamp } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerService {
  document$: WritableSignal<IDocument | null> = signal(null);
  documentId$: WritableSignal<string> = signal('');

  readonly delta$ = new Subject<number>();

  readonly scale$ = this.delta$.pipe(
    scan((scale, next) => tuiClamp(scale + next, 0.5, 3), 1),
    startWith(1),
  );

  readonly transform$ = this.scale$.pipe(map((scale) => `scale(${scale})`));

  constructor() { }

  onZoom(newZoom: number): void {
    this.delta$.next(newZoom);
  }
}
