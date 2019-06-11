import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUser(uname:string,pass:string){
    return this.http.get('http://localhost:4000/api/login/'+uname+'@'+pass);    
  }
}
