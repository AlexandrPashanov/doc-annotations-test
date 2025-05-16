import { IPage } from './page.interface';

export interface IDocument {
  name: string,
  pages: IPage[],
  annotations: any[]
}
