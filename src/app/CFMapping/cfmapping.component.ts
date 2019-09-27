import { Component  } from '@angular/core';
import { ViewCarrierService } from '../Services/view-carrier.service';
import { ViewMappingService } from '../Services/view-mapping.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cfmapping',
  templateUrl: './cfmapping.component.html',
  styleUrls: ['./cfmapping.component.css']
})
export class CFMappingComponent {

  page_heading = 'CF Mappings';

  showMapping:boolean;

  userID:string;
  loggedIn:string;

  colors:string[]=["white","white","white"];

  //array for list of all the carriers
  clients:any;
  carriers:any;
  formats:any;
  layouts:any;
  mapInfo:any;
  sourceInfo:any;
  lookupInfo:any;
  searchText:string;
  

  clientCode:any;

  LayoutType:any;
  AccountStructure:any;
  carrierCode:any;
  carrierCodeVal:any;
  formatCode:any;
  formatCodeVal:any;
  dbUserComments:any;
  Mapping:string;
  map_logi_nm:string;
  map_data_type:string;
  map_length:number;
  map_def_val:string;

  

  constructor(private vcs:ViewCarrierService,private mcs:ViewMappingService,private router:Router, private ac:AppComponent) {
    ac.showNav='yes';
    this.showMapping=false;

    this.userID = localStorage.getItem('userID');

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn==undefined){
      this.router.navigate(['']);
    }
    //to get the list of all the available carrier from the service
    mcs.getAllClientDetails().subscribe(resp=>{this.clients=resp});
    
  }


  //function to be called when a client is selected from the dropdown
  onClientChange(id:any,val:any){
    console.log(val.source.triggerValue);
    this.mcs.getCarriersForClient(id).subscribe(resp=>{this.carriers=resp});
  }

  //function to be called when a carrier is selected from the dropdown
  onCarrierChange(id:any,val:any){
    console.log("carrier is: "+id+" "+val.source.triggerValue);
    this.carrierCodeVal=val.source.triggerValue;
    this.mcs.getFormatsForCarrier(id).subscribe(resp=>{this.formats=resp});
  }

  onFormatChange(id:any,val:any){
    this.formatCodeVal=val.source.triggerValue
    console.log("format is: "+id+" "+val.source.triggerValue);
    
  }

  gotoMapping(){
    console.log("in goto mapping");
    this.mapInfo="";this.sourceInfo="";this.lookupInfo="";

    this.mcs.getLayoutInfo(this.formatCode).subscribe(resp=>{
      this.layouts = resp;
      let nonLab=false;
      this.layouts.forEach(l => {
        
        if(l.prdt_desc=="Lab"){
          this.LayoutType=l.prdt_value;
          nonLab=true;
        }
        
      });

      if(!nonLab){
        this.layouts.push({"prdt_value":-1,"prdt_desc":"All"});
        this.LayoutType=-1;
      }
      
    });
    this.mcs.getMappingInfo().subscribe(resp=>{

      this.mapInfo = resp
    
      this.map_logi_nm = this.mapInfo[0].logi_name;    
      this.map_length =   this.mapInfo[0].len;
      this.map_data_type = this.mapInfo[0].data_type;
      this.map_def_val = this.mapInfo[0].def_val;
      this.Mapping = this.mapInfo[0].mapp;
      this.dbUserComments= this.mapInfo[0].dpComments;
    
    });
    this.mcs.getSourceFields(this.carrierCode,this.formatCode).subscribe(resp=>{this.sourceInfo=resp});
    this.mcs.getLookupFields(this.carrierCode,this.formatCode).subscribe(resp=>{this.lookupInfo=resp});
 
    this.showMapping=true;
  }

  gotoInitMapping(){
    console.log("in goto init mapping");
    this.clientCode="";this.carrierCode="";this.formatCode="";
    this.showMapping=false;
  }

  onLayoutChange(ev:any){

  }

  showMap(nm:string,dt:string,len:number,dv:string,map:string,dpComments:string){
    let tags={select: 'red', from: 'blue', where: 'blue', sysdatabases: 'green', 
              round: '#ff00ff', len: '#ff00ff', count: '#ff00ff', sum: '#ff00ff',
			        avg: '#ff00ff', "var": '#ff00ff',elsif :'red',calcdays: 'blue',"if":'red',"else":'red',
              "DSO_POSTED_CCYYMM":'#008080',CMCM_CD:'#008080',CRCR_CD:'#008080',FMFM_CD:'#008080',FLFM_CD:'#008080'};
              
    console.log("the desc val: "+map.replace("\n","</br>"));
    let new_map=map.replace(/\r\n/gi,"</br>");
    
 
    this.Mapping="<p class=\"red_text\">"+new_map+"</p>";
    this.map_logi_nm=nm;
    this.map_data_type=dt;
    this.map_length=len;
    this.map_def_val=dv;
    this.dbUserComments= dpComments;
    

  }

}
