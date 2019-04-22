import { LoginComponent } from './../login/login.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { CreateCarrierService } from './create-carrier.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'create-carrier',
  templateUrl: './create-carrier.component.html',
  styleUrls: ['./create-carrier.component.css']
})
export class CreateCarrierComponent {

  page_heading = 'New Carrier';
  
  colors:string[]=["white","white","white"];
  
  
  contacts;
  details;
  username:string='mkhan80';

  carrier;
  carrierCode='';
  carrierName='';
  
  carrH:string;
  carrierType;
  carrierPrimary;
  carrierSecondary;
  carrierHalt=false;
  carrierUserComments='';

  constructor(private ccs:CreateCarrierService,nb:NavbarComponent, private ac:AppComponent){
    ac.showNav='yes';
    ccs.getAllContacts().subscribe(resp=>{this.contacts=resp});
  }
  
  carrierHaltEv(val){
    this.carrierHalt=val.checked;
  }


  createCar(){
    console.log("user in create carr: "+this.username);
    console.log("create called");
    console.log("carr ahlt: "+this.carrierHalt);
    this.carrH=this.carrierHalt==false?"N":"Y";
    this.carrier={
      "carrierCode":this.carrierCode,
	    "carrierName":this.carrierName,
	    "carrierHaltInicator":this.carrH,
	    "carrierTypeId":this.carrierType,
	    "primaryContactId":this.carrierPrimary,
	    "secondaryContactId":this.carrierSecondary,
      "userNotes":this.carrierUserComments
    }
    console.log(this.carrier);
    this.ccs.createCarrier(this.carrier,this.username).subscribe(resp=>{
      console.log(resp);
    });
  }
  

}
