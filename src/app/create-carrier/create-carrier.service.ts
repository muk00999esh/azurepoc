import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCarrierService {
  constructor(private http:HttpClient) { 
  }

  getAllContacts(){
    return this.http.get('http://localhost:4000/api/carriers/contacts');    
  }

  createCarrier(body){
    return this.http.post('http://localhost:4000/api/carriers',body);
  }

 
}
