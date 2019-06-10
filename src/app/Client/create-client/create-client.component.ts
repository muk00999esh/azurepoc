import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientServiceService } from '../../Services/client-service.service';

export interface DialogData {
  status: string;
  message: string;
}
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  clientCode='';
  clientName=''
  userNotes='';
  createResult;
  status: string;
  message: string;
  constructor(public dialog: MatDialog,private clientService: ClientServiceService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientPopup, {
      data: {status: this.createResult.status, message: this.createResult.message}
    });
  }

  ngOnInit() {
  }
  createNewClient(){
  let newClient={
    "cmcm_cd":this.clientCode,
    "cmcm_client_nm":this.clientName,
    "usnt_notes":this.userNotes,
      "cmcm_halt_ind": "",
      "cmcm_create_dsus_id": "asriva63",
      "cmcm_engmnt_typ": 0,
      "clpq_retroact_ind": "",
      "clpq_retroact_mon": 0,
      "prdt_desc": []
    
  } 
 
  
  var resp;
  this.clientService.createClient(newClient).subscribe(
    data => {
      resp = data;
      this.createResult = JSON.parse(resp._body);
      this.openDialog();
    });

  
}

  
  

}

@Component({
  selector: 'client-popup',
  templateUrl: 'client-popup.html',
})
export class ClientPopup {

  constructor(
    public dialogRef: MatDialogRef<ClientPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
