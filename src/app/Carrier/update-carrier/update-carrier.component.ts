import { Component} from '@angular/core';
import { ViewCarrierService } from '../../Services/view-carrier.service';
import { UpdateCarrierService } from '../../Services/update-carrier.service';
import { CreateCarrierService } from '../../Services/create-carrier.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { StatusDialogComponent } from '../../Status-dialog/status-dialog.component';


@Component({
  selector: 'app-update-carrier',
  templateUrl: './update-carrier.component.html',
  styleUrls: ['./update-carrier.component.css']
})
export class UpdateCarrierComponent {
  
  carrierCd;
  page_heading = 'Modify Carrier';
  userID:string;
  loggedIn:string;
  showErrMsg=false;
  
  colors:string[]=["white","white","white"];

  //object for storing the data of the selected carrier for modification
  carrier:any;

  //array for list of all the carriers
  carriers:any;

  //list for primary and secondary contacts
  pcontacts:any=[];
  scontacts:any=[];

  //an object for storing the details of the selected carrier from service for UI
  details:any;

  //values that are binded to each field on the UI
  carrH:string;
  
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

  mresult:any;
    

  constructor(private vcs:ViewCarrierService,private ccs:CreateCarrierService,private mcs:UpdateCarrierService,private router:Router,public matDial:MatDialog){
       
    this.userID = localStorage.getItem('userID');

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn==undefined){
      this.router.navigate(['']);
    }
    

    //to get the list of all the available carrier from the service
    vcs.getAllCarriers().subscribe(resp=>{this.carriers=resp});

    //to get the list of primary and secondary contacts
    ccs.getAllContacts().subscribe(resp=>{this.pcontacts=resp,this.scontacts=resp});
    
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
  
  //function to be called when a carrier is selected from the dropdown
  onChange(id:any){

    this.showErrMsg=false;
    this.selectedId=id;

    //reset the values of fields before every change
    this.carrierName='';
    this.carrierType.value='';
    this.carrierPrimaryvalue='';
    this.carrierSecondaryvalue='';
    this.carrierHalt=false;
    this.carrierUserComments='';

    //to get the details of the selected carrier from the service
    this.vcs.getCarrierDetails(id).subscribe(resp=>{
      this.details=resp;    
      
      this.carrierName=this.details.crcr_carrier_nm;

      this.carrierType.value = (this.details.crcr_type_id==1) ? "1" : "2";

      if(this.details.crcr_pri_cont_id!=undefined&&this.details.crcr_pri_cont_id!=''){

        const loc=this.pcontacts;
        const dbval=this.details.crcr_pri_cont_id;
       
        loc.forEach((i: string)=>{
          if(i.indexOf(dbval)!==-1){
            this.carrierPrimaryvalue=i;             
          }
        });

      }


      if(this.details.crcr_sec_cont_id!=undefined&&this.details.crcr_sec_cont_id!=''){

        const loc=this.scontacts;
        const dbval=this.details.crcr_sec_cont_id;
        
        loc.forEach((i: string)=>{
          if(i.indexOf(dbval)!==-1){
            this.carrierSecondaryvalue=i;
            

          }
        });

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
        if(this.carrierPrimaryvalue!=undefined&&this.carrierPrimaryvalue!=''){
          console.log("inside prim undef and empty");
          const cpv=this.carrierPrimaryvalue;
          this.carrier.crcr_pri_cont_id=cpv.substring(cpv.indexOf("-")+1);
        }
        if(this.carrierSecondaryvalue!=undefined&&this.carrierSecondaryvalue!=''){
          console.log("inside sec undef and empty");
          const csv=this.carrierSecondaryvalue;
          this.carrier.crcr_sec_cont_id=csv.substring(csv.indexOf("-")+1);
        }

        console.log(this.carrier);
        
        this.mcs.modifyCarrier(this.carrier,this.selectedId,this.userID).subscribe(resp=>{
          this.mresult=resp;
          console.log(this.mresult.status);
          //this.showStatusMessage(this.mresult.status,"hello");
          this.openDialog(this.mresult.status);
          //alert(this.mresult.status);
        });
        
    
    }else{
      
      this.showErrMsg=true;
      //alert("Please select a carrier...");

    }

    updateForm.reset();
    
  }

  cancelCar(updateForm:NgForm){
    updateForm.reset();
  }

}
