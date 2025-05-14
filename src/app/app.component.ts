import { TuiIcon, TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentLoaderService } from './services/document-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'doc-annotations-test';

  constructor(public docLoaderService: DocumentLoaderService) {}

  saveChanges(): void {
    console.log('saveChanges');
  }

  decreaseZoom(): void {
    console.log('decreaseZoom');
  }

  increaseZoom(): void {
    console.log('increaseZoom');
  }
}
