import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCarrierService {
  constructor(private http:HttpClient) { 
  }

  getAllContacts(){
    return this.http.get('http://localhost:8081/DQMEmployer/api/carriers/contacts');    
  }

  createCarrier(body,uname){
    return this.http.post('http://localhost:8081/DQMEmployer/api/carriers/'+uname,body);
  }

 
}
