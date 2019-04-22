import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor() {
    console.log("date is: "+new Date());
  }

  username:string=''
  date:Date;
  
  color:string[]=["#ff820d","#ff820d","#ff820d","#ff820d","#ff820d","#ff820d","#ff820d"];
  
  resetcolor(){
    let c='';
    for(c in this.color){
      this.color[c]="#ff820d";
    }
  }

  c1(){this.resetcolor();this.color[1]="#fc6600";}

  c2(){this.resetcolor();this.color[2]="#fc6600"}

  c3(){this.resetcolor();this.color[3]="#fc6600"}

  c4(){this.resetcolor();this.color[4]="#fc6600"}

  c5(){this.resetcolor();this.color[5]="#fc6600"}

  c6(){this.resetcolor();this.color[6]="#fc6600"}
    

}
