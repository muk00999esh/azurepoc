import { ViewCarrierService } from './view-carrier.service';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

export interface Carrier{
  carrierId:number;
  carrierCode:string;
}



@Component({
  selector: 'view-carrier',
  templateUrl: './view-carrier.component.html',
  styleUrls: ['./view-carrier.component.css']
})
export class ViewCarrierComponent {
  
  page_heading = 'View Carrier';
  
  
  colors:string[]=["white","white","white"];

  carriers;
  details;

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

  constructor(private vcs:ViewCarrierService,private ac:AppComponent){
    ac.showNav='yes';
    vcs.getAllCarriers().subscribe(resp=>{this.carriers=resp});
  }
  
  onChange(code){
    //reset the values of fields before every change
    this.carrierType.value='';
    this.carrierPrimary.value='';
    this.carrierSecondary.value='';
    this.carrierHalt=false;
    this.carrierUserComments='';

    this.vcs.getCarrierDetails(code).subscribe(resp=>{
      this.details=resp;    
    
      this.carrierName=this.details.carrierName;

      this.carrierType.value="default";         
      this.carrierType.viewValue = (this.details.carrierTypeId==1) ? 'Biggie' :'Non-Biggie';
     
      if(this.details.primaryContactId!=''){
        this.carrierPrimary.value='default';
        this.carrierPrimary.viewValue=this.details.primaryContactId;
      }

      if(this.details.secondaryContactId!=''){
        this.carrierSecondary.value='default';
        this.carrierSecondary.viewValue=this.details.secondaryContactId;
      }

      this.carrierHalt=(this.details.carrierHaltInicator=='Y')?true:false;


      console.log("user notes are: "+this.details.userNotes);

      this.carrierUserComments=(this.details.userNotes!="")?this.details.userNotes:"";
        
    });
    
    
  }
  
  

  
}
