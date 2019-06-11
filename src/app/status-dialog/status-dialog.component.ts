import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent {

  constructor(public dialogRef:MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {

  }

  oK(){
      this.dialogRef.close();
  }

  

}
