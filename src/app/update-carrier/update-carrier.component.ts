import { Component} from '@angular/core';
import { AppComponent } from '../app.component';
import { ViewCarrierService } from '../view-carrier/view-carrier.service';
import { UpdateCarrierService } from './update-carrier.service';
import { CreateCarrierService } from '../create-carrier/create-carrier.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-update-carrier',
  templateUrl: './update-carrier.component.html',
  styleUrls: ['./update-carrier.component.css']
})
export class UpdateCarrierComponent {
  
  carrierCd;
  page_heading = 'Modify Carrier';
  showErrMsg=false;
  
  colors:string[]=["white","white","white"];

  //object for storing the data of the selected carrier for modification
  carrier:any;

  //array for list of all the carriers
  carriers:any;

  //list for primary and secondary contacts
  pcontacts:any;
  scontacts:any;
  pfound:boolean=false;
  sfound:boolean=false;

  //an object for storing the details of the selected carrier from service for UI
  details:any;

  //values that are binded to each field on the UI
  carrH:string;
  username='mkhan80';
  selectedId:number;
  carrierName='';
  carrierType={
    value:'',
    viewValue:''
  };
  carrierPrimaryvalue:string;
  carrierSecondaryvalue:string;
  carrierHalt=false;
  carrierUserComments='';

  //form control for validating the carrier code field on UI
  //carrierCodeControl=new FormControl('', [Validators.required]);

  mresult:any;
  
  

  constructor(private vcs:ViewCarrierService,private ccs:CreateCarrierService,private mcs:UpdateCarrierService,private ac:AppComponent){
       
    ac.showNav='yes';

    //to get the list of all the available carrier from the service
    vcs.getAllCarriers().subscribe(resp=>{this.carriers=resp});

    //to get the list of primary and secondary contacts
    ccs.getAllContacts().subscribe(resp=>{this.pcontacts=resp,this.scontacts=resp});
    
  }
  
  //function to be called when a carrier is selected from the dropdown
  onChange(id:any){

    this.showErrMsg=false;
    this.selectedId=id;
    //reset the values of fields before every change
    this.carrierName='';
    this.carrierType.value='';
    this.carrierHalt=false;
    this.carrierUserComments='';

    //to get the details of the selected carrier from the service
    this.vcs.getCarrierDetails(id).subscribe(resp=>{
      this.details=resp;    
      
      this.carrierName=this.details.crcr_carrier_nm;

        
      this.carrierType.value = (this.details.crcr_type_id==1) ? "1" : "2";

      if(this.pfound){
        this.pfound=false;
        this.pcontacts.pop();
      }
      if(this.details.crcr_pri_cont_id!=undefined){

        const loc=this.pcontacts;
        const dbval=this.details.crcr_pri_cont_id;
       
        loc.forEach((i: string)=>{
          if(i.indexOf(dbval)!==-1){
            this.carrierPrimaryvalue=i; 
            this.pfound=true;
          }
        });

        if(!this.pfound){
          this.pcontacts.push(dbval+'-'+dbval);
          this.carrierPrimaryvalue=dbval+'-'+dbval;
        }
                
      }

      if(this.sfound){
        this.sfound=false;
        this.scontacts.pop();
      }

      if(this.details.crcr_sec_cont_id!=undefined){

        const loc=this.scontacts;
        const dbval=this.details.crcr_sec_cont_id;
        
        loc.forEach((i: string)=>{
          if(i.indexOf(dbval)!==-1){
            this.carrierSecondaryvalue=i;
            this.sfound=true;
          }
        });
        if(!this.sfound){
          this.scontacts.push(dbval+'-'+dbval);
          this.carrierSecondaryvalue=dbval+'-'+dbval;
        }
      }

      this.carrierHalt=(this.details.crcr_halt_ind=='Y')?true:false;

      this.carrierUserComments=(this.details.usnt_notes!="")?this.details.usnt_notes:"";
        
    });
    
    
  }

  // showStatusMessage(message: string, action: string) {
  //   this.snkBar.open(message, action, {
  //     duration: 3000,
  //   });
  // }

  modifyCar(updateForm:NgForm){
    
        
    if(this.carrierCd!=undefined){
      console.log("In not undefined");
        this.showErrMsg=false;
        this.carrH=this.carrierHalt==false?"N":"Y";

        this.carrier={
          
          "crcr_carrier_nm":this.carrierName,
          "crcr_halt_ind":this.carrH,
          "crcr_type_id":parseInt(this.carrierType.value),          
          "usnt_notes":this.carrierUserComments

        }
        if(this.carrierPrimaryvalue!=undefined){
          const cpv=this.carrierPrimaryvalue;
          this.carrier.crcr_pri_cont_id=cpv.substring(cpv.indexOf("-")+1);
        }
        if(this.carrierSecondaryvalue!=undefined){
          const csv=this.carrierSecondaryvalue;
          this.carrier.crcr_sec_cont_id=csv.substring(csv.indexOf("-")+1);
        }
        
        this.mcs.modifyCarrier(this.carrier,this.selectedId,this.username).subscribe(resp=>{
          this.mresult=resp;
          console.log(this.mresult.status);
          //this.showStatusMessage(this.mresult.status,"hello");
          //alert(this.mresult.status);
        });
        
    
    }else{
      
      this.showErrMsg=true;
      //alert("Please select a carrier...");

    }

    updateForm.reset();
    
  }

}
