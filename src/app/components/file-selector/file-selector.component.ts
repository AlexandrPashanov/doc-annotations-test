import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButton, TuiHint, TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-file-selector',
  imports: [
    TuiIcon,
    TuiHint,
    TuiButton
  ],
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.scss'
})
export class FileSelectorComponent {
  @Input() tooltip = 'Выберите файл';
  @Input() commonButtonText = '';
  @Output() fileSelected: EventEmitter<File> = new EventEmitter();

  selected(eventTarget: EventTarget | null, inputElement: HTMLInputElement): void {
    if (!eventTarget) return;
    const file: FileList | null = (eventTarget as HTMLInputElement).files;
    if (file && file.length > 0) {
      this.fileSelected.emit([...file][0]);
      inputElement.value = '';
    }
  }
}
