import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnSavePopupComponent } from '../../on-save-popup/on-save-popup.component';

@Component({
  selector: 'app-add-reformat',
  templateUrl: './add-reformat.component.html',
  styleUrls: ['./add-reformat.component.css']
})
export class AddReformatComponent implements OnInit {
  colors: string[] = ["white", "white", "white"];
  page_heading = "Reformat Information";
  carrier: any[];
  subjectArea: any[];
  selectedSubjectArea = '';
  availableFormat: any[];
  selectedAvailableFormat;
  formatCode = '';
  formatName = '';
  selectedItems = [];
  dropdownSettings = {};
  createReformatResult;
  status: string;
  message: string;



  constructor(private reformatService: ReformatService,public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(OnSavePopupComponent, {
      data: { status: this.createReformatResult.status, message: this.createReformatResult.message }
    });
  }
  ngOnInit() {

    this.getAllCarriers();
    this.getAllSubjectArea();
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'crcr_id',
      textField: 'crcd_nm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }

  getAllCarriers() {
    var resp;
    this.reformatService.getAllCarriers().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getAllSubjectArea() {
    var resp;
    this.reformatService.getAllSubjectArea().subscribe(
      data => {
        resp = data;
        this.subjectArea = JSON.parse(resp._body);
      });
  }
  saveNewFormat(){
    var relInfo=[];
    this.selectedItems.forEach(data => {
      relInfo.push({"crcr_id":data.crcr_id});
    })
    console.log(relInfo)
    
  if (this.formatCode.length != 0 && this.formatName.length != 0) {
    let newReformat= {
      "formatEntry": {
        "flfm_nm":this.formatName,
        "flfm_subject_area":parseInt(this.selectedSubjectArea),
        "flfm_no_rec_typ":0,
        "flfm_cd":this.formatCode,
        "flfm_reformat_mode":"ADD"
      },
      "relationInfo": relInfo
    
    }
    var resp;
    this.reformatService.createNewReformat(newReformat).subscribe(
      data => {
        resp = data;
        this.createReformatResult = JSON.parse(resp._body);
        this.openDialog();
      });
  }
  else {
  }
    
  }
  resetAddFormatPage(){
    this.formatName='';
    this.formatCode='';
    this.selectedSubjectArea='';
    this.selectedItems=[];
  }

}
