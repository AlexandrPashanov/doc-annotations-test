import { TuiIcon, TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DocumentLoaderService } from './services/document-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'doc-annotations-test';

  constructor(public docLoaderService: DocumentLoaderService, private router: Router) {}

  saveChanges(): void {
    console.log('saveChanges');
  }

  loadDocument(eventTarget: EventTarget | null): void {
    if (!eventTarget) return;
    const file: FileList | null = (eventTarget as HTMLInputElement).files;
    if (file && file.length > 0) {
      this.router.navigate([`viewer/${this.getFileIdFormName(file[0].name)}`]);
    }
  }

  decreaseZoom(): void {
    console.log('decreaseZoom');
  }

  increaseZoom(): void {
    console.log('increaseZoom');
  }

  private getFileIdFormName(fileName: string): string {
    const formatPeriodIndex: number = fileName.lastIndexOf('.')
    return fileName.substring(0, formatPeriodIndex);
  }
}
