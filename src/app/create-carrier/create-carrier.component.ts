import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { CreateCarrierService } from './create-carrier.service';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'create-carrier',
  templateUrl: './create-carrier.component.html',
  styleUrls: ['./create-carrier.component.css']
})
export class CreateCarrierComponent {

  page_heading = 'New Carrier';
  
  colors:string[]=["white","white","white"];
  
  cresult:any;

  showErrMsg1=false;
  showErrMsg2=false;

  contacts;
  details;
  username:string='mkhan80';

  carrier:any;
  carrierCode:string;
  carrierName:string;
  
  carrH:string;
  carrierType:any;
  carrierPrimary:any;
  carrierSecondary:any;
  carrierHalt=false;
  carrierUserComments:string;

  constructor(private ccs:CreateCarrierService,nb:NavbarComponent, private ac:AppComponent){
    ac.showNav='yes';
    ccs.getAllContacts().subscribe(resp=>{this.contacts=resp});
  }
  
  carrierHaltEv(val){
    this.carrierHalt=val.checked;
  }


  createCar(createForm:NgForm){

    
    this.showErrMsg1=false;
    this.showErrMsg2=false;

    
    if(this.carrierCode!=undefined&&this.carrierName!=undefined){

      this.carrH=this.carrierHalt==false?"N":"Y";

      this.carrier={
        
        "crcr_cd":this.carrierCode.toUpperCase(),
        "crcr_carrier_nm":this.carrierName,
        "crcr_create_dsus_id":this.username,
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
        alert(this.cresult.status);
      });

    }else{
      if(this.carrierCode==undefined){
        console.log("in code error");
        this.showErrMsg1=true;
      }
  
      if(this.carrierName==undefined){
        console.log("in name error");
        this.showErrMsg2=true;
      }
  
      //alert("please select the required fields")
    }
  
    
    
  }
  

}
