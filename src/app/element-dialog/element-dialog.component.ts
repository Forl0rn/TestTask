import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
})
export class ElementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, completionDate: Date, description: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
}