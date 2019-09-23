import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReformatService } from '../Services/reformat.service';

export interface DialogData {
  status: string;
  message: string;
  navigate: string;
  formatCode: string;
}
@Component({
  selector: 'app-on-save-popup',
  templateUrl: './on-save-popup.component.html',
  styleUrls: ['./on-save-popup.component.css']
})
export class OnSavePopupComponent  {

  constructor(public dialogRef: MatDialogRef<OnSavePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router:Router,private reformatService: ReformatService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirm(){
    this.reformatService.serviceData=this.data.formatCode;
    this.dialogRef.close();    
    this.router.navigate([this.data.navigate]);
  }

}
