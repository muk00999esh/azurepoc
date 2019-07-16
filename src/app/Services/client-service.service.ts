import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers , RequestOptions } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  url = 'http://localhost:4000/api'
  constructor(private http: Http) { }
  getClients(){
    return this.http.get(`${this.url}/clientList`);
  }
  getAllClientDetails(val){
    return this.http.get(`${this.url}/clientDetails/`+ val);
  }
  getAllClientCoverage(){
    return this.http.get(`${this.url}/clientCoverageDetail`);
  }
  getScrambleInfo(val){
    return this.http.get(`${this.url}/clientScramble/`+val);
  }
  submitUpdation(updateObject){
    return this.http.put(`${this.url}/updateAll`,updateObject);
  }
  createClient(createObject){
    return this.http.post(`${this.url}/clientCreate`,createObject);
  }
  
}
