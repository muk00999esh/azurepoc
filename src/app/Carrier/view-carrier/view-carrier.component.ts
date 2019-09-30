import { ViewCarrierService } from '../../Services/view-carrier.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'view-carrier',
  templateUrl: './view-carrier.component.html',
  styleUrls: ['./view-carrier.component.css']
})
export class ViewCarrierComponent {
  
  page_heading = 'View Carrier';
  
  userID:string;
  loggedIn:string;

  colors:string[]=["white","white","white"];

  //array for list of all the carriers
  carriers:any;

  //an object for storing the details of the seleced carrier
  details:any;

  //values that are binded to each field on the UI
  carrierCode='';
  carrierName='';
  carrierType={
    value:'',viewValue:''
  };
  carrierPrimary={
    value:'',viewValue:''
  };
  carrierSecondary={
    value:'',viewValue:''
  };
  carrierHalt=false;
  carrierUserComments='';

  constructor(private vcs:ViewCarrierService,private router:Router){

    this.userID = localStorage.getItem('userID');

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn==undefined){
      this.router.navigate(['']);
    }
    //to get the list of all the available carrier from the service
    vcs.getAllCarriers().subscribe(resp=>{this.carriers=resp});
  }
  
  //function to be called when a carrier is selected from the dropdown
  onChange(id:any){

    //reset the values of fields before every change
    this.carrierName='';
    this.carrierType.value='';
    this.carrierPrimary.value='';
    this.carrierSecondary.value='';
    this.carrierHalt=false;
    this.carrierUserComments='';

    //to get the details of the selected carrier from the service
    this.vcs.getCarrierDetails(id).subscribe(resp=>{
      this.details=resp;    
     
      this.carrierName=this.details.crcr_carrier_nm;

      this.carrierType.value='default';         
      this.carrierType.viewValue = (this.details.crcr_type_id==1) ? 'Biggie' :'Non-Biggie';
     
      if(this.details.primaryContactId!=''){
        this.carrierPrimary.value='default';
        this.carrierPrimary.viewValue=this.details.crcr_pri_cont_id;
      }

      if(this.details.secondaryContactId!=''){
        this.carrierSecondary.value='default';
        this.carrierSecondary.viewValue=this.details.crcr_sec_cont_id;
      }

      this.carrierHalt=(this.details.crcr_halt_ind=='Y')?true:false;

      this.carrierUserComments=(this.details.usnt_notes!="")?this.details.usnt_notes:"";
        
    });
    
    
  }

  closeCar(viewForm:NgForm){
    viewForm.reset();
  }
  
}
