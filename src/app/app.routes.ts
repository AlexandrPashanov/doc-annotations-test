import { Routes } from '@angular/router';
import { ViewerComponent } from './components/viewer/viewer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  { path: 'viewer/:id', component: ViewerComponent },
  { path: '**', component: PageNotFoundComponent }
];
