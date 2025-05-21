import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnnotationType } from '../interfaces/annotation.type';
import { IAnnotation } from '../interfaces/document.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AnnotationsService {
  addAnnotationMode = false;
  annotationControl: FormControl = new FormControl();
  addedAnnotations: IAnnotation[] = [];

  private deleteButton: () => HTMLElement = () => {
    const deleteIcon: HTMLElement = document.createElement('group');
    deleteIcon.style.width = '25px';
    deleteIcon.style.height = '25px';
    deleteIcon.style.display = 'block';
    deleteIcon.style.position = 'absolute';
    deleteIcon.style.top = '-12px';
    deleteIcon.style.left = '-12px';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.onclick = () => {
      const svgElement = deleteIcon.parentElement;
      if (svgElement) {
        this.addedAnnotations = this.addedAnnotations.filter((annotation: IAnnotation) => annotation.id !== svgElement.id);
        svgElement.remove();
      }
    }
    deleteIcon.innerHTML = `<svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"/>
    <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"/>
</svg>`;
    return deleteIcon;
  };

  type: AnnotationType = 'text';

  selectedElement: HTMLElement | null = null;

  constructor() { }

  switchType(type: AnnotationType) {
    this.annotationControl.setValue(null);
    this.type = type;
  }

  addListener() {
    this.addAnnotationMode = true;
  }

  removeListener(event: MouseEvent) {
    this.createAnnotation(event);
    this.annotationControl.setValue(null);
    this.addAnnotationMode = false;
  }

  private createAnnotation(event: MouseEvent) {
    const element = document.getElementById('viewContainer');
    if (!this.addAnnotationMode || !element) return;
    const id: string = uuidv4();
    const svgCore: HTMLElement = this.drawAnnotationContainer(event, id);

    if (this.type === 'text') {
      this.drawTextAnnotation(event, svgCore);
    } else {
      this.drawImageAnnotation(svgCore);
    }
    this.addedAnnotations.push({
      id,
      type: this.type,
      content: this.annotationControl.value
    });
    element.appendChild(svgCore);
  }

  private drawAnnotationContainer(event: MouseEvent, id: string): HTMLElement {
    const rootElement: HTMLElement = document.createElement('svg');
    rootElement.setAttribute('id', id);
    rootElement.classList.add('draggable');
    rootElement.addEventListener('mousedown', this.startDrag);
    rootElement.addEventListener('mousemove', this.drag);
    rootElement.addEventListener('mouseup', this.endDrag);
    rootElement.addEventListener('mouseleave', this.endDrag);

    rootElement.appendChild(this.deleteButton());

    rootElement.style.position = "absolute";
    rootElement.style.border = "2px solid yellow";
    rootElement.style.top = `${event.layerY}px`;
    rootElement.style.left = `${event.layerX}px`;
    rootElement.style.padding = `15px`;
    return rootElement;
  }

  private drawTextAnnotation(event: MouseEvent, rootElement: HTMLElement) {
    const svgText = document.createElement('text');
    svgText.classList.add('subDraggable');
    svgText.innerHTML = this.annotationControl.value;
    svgText.style.background = 'rgba(255, 255, 0, 0.5)';
    svgText.style.color = 'black';
    rootElement.setAttribute('x', String(event.layerX));
    rootElement.setAttribute('y', String(event.layerY));
    rootElement.appendChild(svgText);
  }

  private drawImageAnnotation(rootElement: HTMLElement) {
    const img = new Image();
    img.src = URL.createObjectURL(this.annotationControl.value);
    img.onload = () => {
      img.style.maxWidth = '400px';
      img.style.maxHeight = '400px';
      img.style.opacity = '0.4';
      rootElement.style.maxWidth = '400px';
      rootElement.style.maxHeight = '400px';
      rootElement.style.display = 'flex';
      rootElement.style.justifyContent = 'center';
      rootElement.style.width = `${img.width}px`;
      rootElement.style.height = `${img.height}px`;
      rootElement.appendChild(img);
    }
  }

  private startDrag(evt: MouseEvent) {
    if (!evt.target) return;
    const target: HTMLElement = evt.target as HTMLElement;
    if (target.classList.contains('draggable')) {
      this.selectedElement = target;
    }
    if (target.classList.contains('subDraggable')) {
      this.selectedElement = (evt.target as HTMLElement).parentElement;
    }
  }

  private drag(evt: MouseEvent) {
    if (this.selectedElement) {
      evt.preventDefault();
      const currentTop = +this.selectedElement.style.top.replace('px', '');
      const currentLeft = +this.selectedElement.style.left.replace('px', '');
      this.selectedElement.style.top = `${evt.movementY + currentTop}px`;
      this.selectedElement.style.left = `${evt.movementX + currentLeft}px`;
    }
  }

  private endDrag() {
    this.selectedElement = null;
  }
}
