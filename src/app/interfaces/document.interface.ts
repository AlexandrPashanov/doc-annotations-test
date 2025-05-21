import { IPage } from './page.interface';

import { AnnotationType } from './annotation.type';

export interface IDocument {
  name: string,
  pages: IPage[],
  annotations: IAnnotation[]
}

export interface IAnnotation {
  id: string;
  type: AnnotationType;
  content: string; // image url or text string
}
