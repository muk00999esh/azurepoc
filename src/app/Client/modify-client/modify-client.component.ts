import { ClientServiceService } from '../../Services/client-service.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatOption } from '@angular/material';
export interface DialogData {
  status: string;
  message: string;
}
@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.css']
})
export class ModifyClientComponent {
  colors: string[] = ["white", "white", "white"];
  page_heading = "Modify Client Profile";
  selectedEngagementType = '';
  clients: any[];
  selectedCd = '';
  clientName = '';
  selectedStatus='';
  retroMonth = '';
  selectedId;
  clientDetails;
  allflag = false;
  require=false;
  coverageDetail = new FormControl();
  coverageList;
  scrambleDetl = [];
  range = [];
  remRange = ["--Select--",0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "No Mapping"];
  displayedColumns: string[] = ["source", "map_pxi", "map_rem_byte"];
  selectedList;
  updateResult;
  scrambleValidation;
  @ViewChild('allSelected') private allSelected: MatOption;
  constructor(public dialog: MatDialog, private clientService: ClientServiceService, private router: Router) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdatePopup, {
      data: {status: this.updateResult.status, message: this.updateResult.message}
    });
  }
  ngOnInit() {
    this.range[0]="--Select--";
    for (var i = 10; i < 100; i++) {
      this.range.push(i);
    }
    this.selectedEngagementType = '0';
    this.retroMonth = 's';
    this.getClients();
  }

  getClients() {
    var resp;
    this.clientService.getClients().subscribe(
      data => {
        resp = data;
        this.clients = JSON.parse(resp._body);
      });
  }
  getAllClientDetails(val) {
    var resp;
    this.selectedCd = val;
    this.coverageDetail.patchValue([]);
    this.clientService.getAllClientDetails(val).subscribe(
      data => {
        resp = data;
        this.clientDetails = JSON.parse(resp._body);
        this.selectedId = this.clientDetails.cmcm_id;
        this.clientName = this.clientDetails.cmcm_client_nm;
        this.retroMonth = this.clientDetails.clpq_retroact_mon.toString();
        this.selectedStatus = this.clientDetails.clpq_retroact_ind;
        if (this.clientDetails.cmcm_engmnt_typ == 1) {
          this.selectedEngagementType = '1';
        } else if (this.clientDetails.cmcm_engmnt_typ == 2) {
          this.selectedEngagementType = '2';
        } else {
          this.selectedEngagementType = '0';
        }
        this.selectedList = this.clientDetails.prdt_desc;
        this.getAllClientCoverage();
        this.getAllSelectedCoverage(this.clientDetails.prdt_desc);
        this.getScrambleInfo(this.selectedId);
      });

  }
  getAllClientCoverage() {
    var resp;
    this.clientService.getAllClientCoverage().subscribe(
      data => {
        resp = data;
        this.coverageList = JSON.parse(resp._body);
        this.allflag = true;
      });
  }
  getAllSelectedCoverage(selectedData) {
    selectedData.forEach(data => {
      this.coverageDetail.value.push(data);
      this.coverageDetail.patchValue([...this.coverageDetail.value]);
    })
  }
  getScrambleInfo(selectedID) {
    var resp;
    this.scrambleDetl = [];
    this.clientService.getScrambleInfo(selectedID).subscribe(
      data => {
        resp = data;
        this.scrambleDetl = JSON.parse(resp._body);
        if(this.scrambleDetl.length == 0){
          this.scrambleDetl=[{
            "source": 0,
            "map_pxi": "--Select--",
            "map_rem_byte":"--Select--"
          }, {
            "source": 1,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 2,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 3,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 4,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 5,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 6,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 7,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 8,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }, {
            "source": 9,
            "map_pxi": "--Select--",
            "map_rem_byte": "--Select--"
          }]
        }
      });
      
  }
  toggleAllSelection() {
    var list = this.coverageList.map(function (lst) { return lst.desc; });
    if (this.allSelected.selected) {
      this.coverageDetail.patchValue([...list, 0]);
      this.coverageDetail.value.pop();
    } else {
      this.coverageDetail.patchValue([]);
    }
  }


  OnSubmitClick(engagement: number, retroValueMonth: number, userInput: string) {
    this.scrambleValidation=true;
    this.scrambleDetl.forEach(data => {
      if(data.source== "--Select--" || data.map_pxi== "--Select--" || data.map_rem_byte== "--Select--"){
        this.scrambleValidation=false;
        
      }
    })

    
    if(this.selectedId != undefined && this.clientName.length !=0 && this.scrambleValidation==true ){
      var toCompare = {
        clientDetails: {
          "cmcm_id": this.selectedId,
          "cmcm_client_nm": this.clientName,
          "cmcm_engmnt_typ": engagement,
          "clpq_retroact_ind": this.selectedStatus,
          "clpq_retroact_mon": retroValueMonth,
          "usnt_notes": userInput,
          "prdt_desc": this.coverageDetail.value,
          "cmcm_update_dsus_id": "asriva63"
        },
        table: { "scramble_table": this.scrambleDetl }
      }
      var resp;
      this.clientService.submitUpdation(toCompare).subscribe(
        data => {
          resp = data;
          this.updateResult = JSON.parse(resp._body);
          this.openDialog();
        });

    }
    else{
      this.require=true;
    }
   


    
  }
  resetPage(){
    this.selectedCd = '';
    this.clientName = '';
    this.selectedEngagementType='';
    this.coverageDetail.patchValue([]);
    this.selectedStatus='';
    this.retroMonth = '';
  }


}
@Component({
  selector: 'update-popup.html',
  templateUrl: 'update-popup.html',
})
export class UpdatePopup {

  constructor(
    public dialogRef: MatDialogRef<UpdatePopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
