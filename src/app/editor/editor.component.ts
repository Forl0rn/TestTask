import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ElementService } from '../models/element.service';
import { Element } from '../models/element.model';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  constructor(
    private elementService: ElementService, 
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef  
  ) { }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: { name: '', description: '', completionDate: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.addElement(result);
        this.updateElements();
      }
    });
  }

  deleteElement(id: number): void {
    this.elementService.deleteElement(id);
    this.updateElements();
  }

  copyElement(element: Element): void {
    const { id, ...rest } = element;  
    this.elementService.addElement(rest);
    this.updateElements();
  }

  get elements() {
    return this.elementService.getElements();
  }

  private updateElements(): void {
    const newElements = [...this.elements];
    this.elementService.updateElementList(newElements);
    this.cdr.detectChanges(); 
  }
}