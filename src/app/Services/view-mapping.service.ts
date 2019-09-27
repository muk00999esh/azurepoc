import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewMappingService {

  constructor(private http:HttpClient) { }

  getAllClientDetails() {
    return this.http.get('http://localhost:4000/api/allclientdetails');
    
  }

  getCarriersForClient(id: any) {
    return this.http.get('http://localhost:4000/api//carriersforclient/'+id);
  }

  getFormatsForCarrier(id: any) {
    return this.http.get('http://localhost:4000/api/formatsforcarrier/'+id);
  }

  getLayoutInfo(id:any){
    return this.http.get('http://localhost:4000/api//mappingsubjareadetails/'+id);
  }

  getMappingInfo(){
    return this.http.get('http://localhost:4000/api/transformdetails');
  }

  getSourceFields(cid:number,fid:number){
    return this.http.get('http://localhost:4000/api/mappingsourcedetails/'+cid+'/'+fid);
  }

  getLookupFields(cid:number,fid:number){
    return this.http.get('http://localhost:4000/api/mappinglookupdetails/'+cid+'/'+fid);
  }
}
