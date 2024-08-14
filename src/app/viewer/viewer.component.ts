import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElementService } from '../models/element.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';
import { Element } from '../models/element.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  elements: Element[] = [];

  constructor(
    private elementService: ElementService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.elements = this.elementService.getElements();  // Загружаем элементы при инициализации компонента
    this.checkForOverdueElements();
  }

  checkForOverdueElements(): void {
    const now = new Date();
    this.elements.forEach(element => {
      if (element.completionDate < now) {
        this.snackBar.open(`Элемент "${element.name}" просрочен!`, 'Закрыть', {
          duration: 5000,
        });
      }
    });
  }

  moveUp(index: number): void {
    if (index > 0) {
      const newElements = [...this.elements];
      [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
      this.elements = newElements;
      this.updateElements();
      this.cdr.detectChanges();
    }
  }
  
  moveDown(index: number): void {
    if (index < this.elements.length - 1) {
      const newElements = [...this.elements];
      [newElements[index + 1], newElements[index]] = [newElements[index], newElements[index + 1]];
      this.elements = newElements;
      this.updateElements();
      this.cdr.detectChanges();
    }
  }

  openViewDialog(element: Element): void {
    this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element
    });
  }

  private updateElements(): void {
    this.elementService.updateElementList(this.elements);
  }

}