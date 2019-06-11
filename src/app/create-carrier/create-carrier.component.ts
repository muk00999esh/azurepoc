import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';
import { CreateCarrierService } from './create-carrier.service';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'create-carrier',
  templateUrl: './create-carrier.component.html',
  styleUrls: ['./create-carrier.component.css']
})
export class CreateCarrierComponent {

  page_heading = 'New Carrier';
  
  colors:string[]=["white","white","white"];
  
  cresult:any;

  userID:string;
  loggedIn:string;

  showErrMsg1=false;
  showErrMsg2=false;

  contacts:any;
  details:any;
  

  carrier:any;
  carrierCode:string;
  carrierName:string;
  
  carrH:string;
  carrierType:any;
  carrierPrimary:any;
  carrierSecondary:any;
  carrierHalt=false;
  carrierUserComments:string;

  constructor(private ccs:CreateCarrierService,nb:NavbarComponent, private ac:AppComponent,private router:Router, public matDial:MatDialog){
    ac.showNav='yes';

    this.userID = localStorage.getItem('userID');

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn==undefined){
      this.router.navigate(['']);
    }
    ccs.getAllContacts().subscribe(resp=>{this.contacts=resp});
  }
  
  carrierHaltEv(val){
    this.carrierHalt=val.checked;
  }

  openDialog(res:string): void {

    let dialogRef = this.matDial.open(StatusDialogComponent, {
      width:'250px',
      data:{        
        status:res
      }      
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed'); 
    //   console.log(result);
    // });

  }


  createCar(createForm:NgForm){

    
    this.showErrMsg1=false;
    this.showErrMsg2=false;

    
    if(this.carrierCode!=undefined&&this.carrierCode.trim()!=''&&this.carrierName!=undefined&&this.carrierName.trim()!=''){
      console.log("in if carrier");

      this.carrH=this.carrierHalt==false?"N":"Y";

      this.carrier={
        
        "crcr_cd":this.carrierCode,
        "crcr_carrier_nm":this.carrierName,
        "crcr_create_dsus_id":this.userID,
        "crcr_halt_ind":this.carrH,
        "crcr_type_id":parseInt(this.carrierType),
        "usnt_notes":this.carrierUserComments
      }

      if(this.carrierPrimary!=undefined){
        const cpv=this.carrierPrimary;
        this.carrier.crcr_pri_cont_id=cpv.substring(cpv.indexOf("-")+1);
      }
      if(this.carrierSecondary!=undefined){
        const csv=this.carrierSecondary;
        this.carrier.crcr_sec_cont_id=csv.substring(csv.indexOf("-")+1);
      }
      
      this.ccs.createCarrier(this.carrier).subscribe(resp=>{
        this.cresult=resp;
        console.log(this.cresult.status);
        createForm.reset();
        this.openDialog(this.cresult.status);
        //alert(this.cresult.status);
      });

    }else{
      console.log("in else carrier");

      if(this.carrierCode==undefined||this.carrierCode.trim()==''){
        console.log("in code error");
        this.showErrMsg1=true;
      }
  
      if(this.carrierName==undefined||this.carrierName.trim()==''){
        console.log("in name error");
        this.showErrMsg2=true;
      }
  
      //alert("please select the required fields")
    }
  
    
    
  }

  cancelCar(createForm:NgForm){
    createForm.reset();
  }
  

}
