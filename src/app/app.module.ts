import { CreateCarrierService } from './Services/create-carrier.service';
import { ViewCarrierService } from './Services/view-carrier.service';
import { ClientServiceService } from './Services/client-service.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatMenuModule,MatDialogModule, MatToolbarModule,MatRadioModule, MatTableModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ViewCarrierComponent } from './Carrier/view-carrier/view-carrier.component';
import { CreateCarrierComponent } from './Carrier/create-carrier/create-carrier.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent, ClientPopup } from './Client/create-client/create-client.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewClientComponent } from './Client/view-client/view-client.component';
import { ModifyClientComponent } from './Client/modify-client/modify-client.component';



@NgModule({
  declarations: [
    AppComponent,
    ViewCarrierComponent,
    CreateCarrierComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CreateClientComponent,
    ClientPopup,
    ViewClientComponent,
    ModifyClientComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    HttpModule,
    HttpClientModule,
    MatToolbarModule,
    MatRadioModule,
    MatTableModule,
    AppRoutingModule
  ],
  entryComponents:[ClientPopup],
  providers: [
    LoginComponent,
    NavbarComponent,
    ViewCarrierService,
    CreateCarrierService,
    ClientServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
