import { CreateCarrierService } from './create-carrier/create-carrier.service';
import { ViewCarrierService } from './view-carrier/view-carrier.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatMenuModule, MatToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ViewCarrierComponent } from './view-carrier/view-carrier.component';
import { CreateCarrierComponent } from './create-carrier/create-carrier.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    ViewCarrierComponent,
    CreateCarrierComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      {path:'home',component:HomeComponent},
      {path:'createCarrier',component:CreateCarrierComponent},
      {path:'viewCarrier',component:ViewCarrierComponent}

    ])
  ],
  providers: [
    LoginComponent,
    NavbarComponent,
    ViewCarrierService,
    CreateCarrierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
