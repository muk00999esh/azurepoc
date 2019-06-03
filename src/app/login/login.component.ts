import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ls:LoginService,private router:Router,private ac:AppComponent) {
    ac.showNav='no';
   }

  
  color:string="#ff820d";

  userName='';
  userPassword='';
  result:any;

  checkUser(){
    //console.log(this.userName+":"+this.userPassword);
    this.ls.getUser(this.userName,this.userPassword).subscribe(resp=>{
      this.result=resp;

      if(this.result.status=="Success"){
        
        console.log("success");
        
        this.router.navigate(['home']);
        
      }else{
        console.log("Failure");
      }

    });
    
  }
 

}
