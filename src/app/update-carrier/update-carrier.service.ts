import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateCarrierService {

  constructor(private http:HttpClient) { 
  }

  modifyCarrier(body:any,id:number,uname:string){
    return this.http.put('http://localhost:4000/api/carriers/'+id+"/"+uname,body);
  }
}
