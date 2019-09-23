import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnSavePopupComponent } from '../../on-save-popup/on-save-popup.component';


@Component({
  selector: 'app-modify-reformat',
  templateUrl: './modify-reformat.component.html',
  styleUrls: ['./modify-reformat.component.css']
})
export class ModifyReformatComponent implements OnInit {
  colors: string[] = ["white", "white", "white"];
  page_heading = "Modify Reformat Information";
  carrier: any[];
  selectedCarr = "S";
  subjectArea: any[];
  formatTyp = "S";
  selectedSubjectArea = "S";
  availableFormat: any[];
  fileType: any[];
  delimiter = '';
  selectedAvailableFormat = "S";
  formatName = '';
  userNotes = '';
  fileDetail;
  selectedItems = [];
  layout = [];
  layoutSelected = "S";
  dropdownSettings = {};
  updateResult;
  error = "";

  constructor(private reformatService: ReformatService, public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(OnSavePopupComponent, {
      data: { status: this.updateResult.status, message: this.updateResult.message, navigate: 'modifyReformatLayout', formatCode:this.selectedAvailableFormat }
    });
  }
  ngOnInit() {
    this.getAllCarriers();
    this.getFileType();
    this.getAllCarriersModifyScreen();
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

  getAllCarriersModifyScreen() {
    var resp;
    this.reformatService.getAllCarriersModifyScreen().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getAllCarriers() {
    var resp;
    this.reformatService.getAllCarriers().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getRelatedSubjectArea(val) {
    this.selectedSubjectArea = "S";
    this.selectedAvailableFormat = "S";
    this.formatName = '';
    this.formatTyp = "S";
    this.selectedItems = [
    ];
    this.layoutSelected = "S",
      this.userNotes = '';
    var resp;
    this.reformatService.getRelatedSubjectArea(val).subscribe(
      data => {
        resp = data;
        this.subjectArea = JSON.parse(resp._body);
      });
  }
  getAvaiableFormat(val) {
    this.selectedAvailableFormat = "S";
    this.formatName = '';
    this.formatTyp = "S"
    this.selectedItems = [
    ];
    this.layoutSelected = "S",
      this.userNotes = '';
    var obj = { "carrier": this.selectedCarr, "subjArea": val }
    var resp;
    this.reformatService.getAvailableFormat(obj).subscribe(
      data => {
        resp = data;
        this.availableFormat = JSON.parse(resp._body);
      });
    this.reformatService.getLayoutDetails(val).subscribe(
      data => {
        resp = data;
        this.layout = JSON.parse(resp._body);
      });
  }
  getFileType() {
    var resp;
    this.reformatService.getFileType().subscribe(
      data => {
        resp = data;
        this.fileType = JSON.parse(resp._body);
      });
  }
  getFormatRelatedDetails(val) {
    var resp;
    this.formatName = '';
    this.layoutSelected = "S",
      this.formatTyp = "S";
    this.userNotes = '';
    this.selectedCarrierList(val);
    this.reformatService.getFormatRelatedDetails(val).subscribe(
      data => {
        resp = data;
        this.fileDetail = JSON.parse(resp._body);
        this.formatName = this.fileDetail.flfm_nm;
        if (this.fileDetail.usnt_notes != undefined) {
          this.userNotes = this.fileDetail.usnt_notes
        }
        if (this.fileDetail.flfm_file_typ != undefined) {
          this.formatTyp = this.fileDetail.flfm_file_typ;
        }
        if (this.fileDetail.flfm_layout_typ != undefined) {
          this.layoutSelected = this.fileDetail.flfm_layout_typ
        }
      });

  }
  selectedCarrierList(val) {
    var resp;
    this.reformatService.selectedCarrierList(val).subscribe(
      data => {
        resp = data;
        this.selectedItems = JSON.parse(resp._body);
      });
  }
  saveFirst() {
    this.error = "";
    if (this.selectedCarr == "S") {
      this.error = "*Please select a Carrier";
    } else if (this.selectedSubjectArea == "S") {
      this.error = "*Please select a Subject Area";
    } else if (this.selectedAvailableFormat == "S") {
      this.error = "*Please select Format Code to modify";
    } else if (this.selectedItems.length == 0) {
      this.error = "*Please select atleast one carriers associated with the format code";
    } else if (this.formatName.length == 0) {
      this.error = "*Format Name cannot be blank";
    } else if (this.formatTyp == "S") {
      this.error = "*Please select File Type";
    } else if (this.layoutSelected == "S") {
      this.error = "*Please select Layout Type";
    }
    else {
      this.error = "";
      var crcdId = [];
      this.selectedItems.forEach(res => {
        crcdId.push(res.crcr_id);
      })
      var updObj = {
        "detail": {
          "flfm_id": this.selectedAvailableFormat,
          "flfm_nm": this.formatName,
          "flfm_file_typ": this.formatTyp,
          "flfm_layout_typ": this.layoutSelected,
          "usnt_notes": this.userNotes
        },
        "carrier": crcdId
      }
      var resp;
      this.reformatService.submitUpdate(updObj).subscribe(
        data => {
          resp = data;
          this.updateResult = JSON.parse(resp._body);
          this.openDialog();
        });
    }
  }

}
