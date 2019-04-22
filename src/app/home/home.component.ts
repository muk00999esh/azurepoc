import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  constructor(private ac:AppComponent) {
    ac.showNav='yes';
  }


}
