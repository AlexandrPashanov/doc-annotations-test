import { Routes } from '@angular/router';
import { ViewerComponent } from './components/viewer/viewer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { documentResolver } from './guard/document-resolver.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  { path: 'viewer/:id', component: ViewerComponent, resolve: { document: documentResolver }  },
  { path: '**', component: PageNotFoundComponent }
];
