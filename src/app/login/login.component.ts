import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private ls:LoginService,private router:Router,private ac:AppComponent) {
    ac.showNav='no';

    localStorage.setItem('loggedIn',"false");
  }

  loginErrFlag=false;
  loginUPFlag=false;
  loginUFlag=false;
  loginPFlag=false;

  color:string="#ff820d";
  white:string="#FFFFFF";

  userName:string;
  userPassword:string;
  result:any;

  checkUser(){
    
    this.loginErrFlag=false;
    this.loginUPFlag=false;
    this.loginUFlag=false;
    this.loginPFlag=false;

    

    if(this.userName!=undefined&&this.userPassword!=undefined){
      this.ls.getUser(this.userName,this.userPassword).subscribe(resp=>{
        this.result=resp;
  
        if(this.result.status=="Success"){
          
          console.log("success");

          localStorage.setItem('userID',this.userName);
          localStorage.setItem('loggedIn',"true");
          
          this.router.navigate(['home']);
          
        }else{
          this.loginErrFlag=true;
          console.log("Failure");
        }
  
      });
    }else{
      if(this.userName==undefined&&this.userPassword==undefined){
        this.loginUPFlag=true;
      }else{
        if(this.userName==undefined){
          this.loginUFlag=true;
        }if(this.userPassword==undefined){
          this.loginPFlag=true;
        }
      }
      
    }
    
    
  }
 

}
